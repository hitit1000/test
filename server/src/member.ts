import { createHashedPassword, makePasswordHashed } from "./crypto";
import mysql, { getConnection } from "./db/pool";
import logger from "./log/winston";

const signup = async (name: string, plainPassword: string, email: string, phone: string, login_type: string | number, auth_type: string | number) => {
  let result = true;
  const conn = await getConnection();
  await conn.beginTransaction();
  try {
    const { password, salt } = await createHashedPassword(plainPassword);
    const [rows]: any = await conn.query(`INSERT INTO member.user (user_name,login_type,auth_type) VALUES ('${name}',${login_type},${auth_type});`);
    const user_id = rows.insertId;
    await conn.query(`INSERT INTO auth.password (user_no,salt,password) VALUES (${user_id},'${salt}','${password}');`);
    await conn.query(`INSERT INTO member.auth_individual (user_no,cell_phone,email) VALUES (${user_id},'${phone}','${email}');`);
    await conn.commit();
  } catch (e: any) {
    await conn.rollback();
    result = false;
    logger.error(`Signup Error - code : ${e.code} / sql : ${e.sql} / sqlMessage: ${e.sqlMessage}`);
  } finally {
    conn.release(); // pool 을 돌려주는 역할을 한다.
    // mysql.end();
  }
  return result;
};
const signup2 = async (
  name: string,
  plainPassword: string,
  email: string,
  phone: string,
  login_type: string | number,
  auth_type: string | number
) => {
  let msg = "";
  let result = false;
  try {
    let user_id;
    const [rows]: any = await mysql.query(`SELECT EXISTS(SELECT * FROM member.user WHERE user_name='${name}' ) AS isChk`);
    if (rows[0].isChk === 0) {
      // 동일한 ID가 없음
      const { password, salt } = await createHashedPassword(plainPassword);
      try {
        const [rows]: any = await mysql.query(`INSERT INTO member.user (user_name,login_type,auth_type) VALUES ('${name}',1,1);`);
        user_id = rows.insertId;
      } catch (e: any) {
        msg = "insert data in member.user";
        logger.error(`${msg} - ${e.code}`);
      }
      if (msg === "") {
        // 위의 ID 등록 시 정상이면 실행
        try {
          await mysql.query(`INSERT INTO auth.password (user_no,salt,password) VALUES (${user_id},'${salt}','${password}');`);
        } catch (e: any) {
          msg = "insert data in auth.password";
          logger.error(`${msg} - ${e.code}`);
          try {
            await mysql.query(`DELETE FROM member.user WHERE user_name = '${name}'`);
          } catch (e: any) {
            msg = "delete data in member.user";
            logger.error(`${msg} - ${e.code}`);
          }
        }
      }
      if (msg === "") {
        // 위의 아이디, 패스워드 등록 시 정상이면 실행
        try {
          await mysql.query(`INSERT INTO auth_individual (user_no,cell_phone,email) VALUES (${user_id},'${phone}','${email}');`);
          msg = "Account registration successful";
          result = true;
          logger.info("Account registration successful");
        } catch (e: any) {
          msg = "insert data inauth_individual";
          logger.error(`${msg} - ${e.code}`);
          try {
            await mysql.query(`DELETE FROM member.user WHERE user_name = '${name}'`);
          } catch (e: any) {
            msg = "delete data in member.user";
            logger.error(`${msg} - ${e.code}`);
          }
          try {
            await mysql.query(`DELETE FROM auth.password WHERE user_name = '${name}'`);
          } catch (e: any) {
            msg = "delete data in auth.password";
            logger.error(`${msg} - ${e.code}`);
          }
        }
      }
    } else {
      // 동일한 ID가 있음
      logger.error("Account already registered");
      msg = "Account already registered";
    }
  } catch (e: any) {
    msg = "Check Error in member.user";
    logger.error(`${msg} - ${e.code}`);
  }
  return { result: result, msg: msg };
};

const login = async (name: string, plainPassword: string) => {
  let result = false;
  try {
    const [rows]: any = await mysql.query(
      `SELECT auth.password.salt,auth.password.password FROM member.user right OUTER JOIN auth.password ON member.user.user_no = auth.password.user_no WHERE member.user.user_name='${name}'`
    );
    const dbPassword = rows[0].password;
    const dbSalt = rows[0].salt;
    const password = await makePasswordHashed(plainPassword, dbSalt);
    if (password === dbPassword) {
      // 로그인 성공
      logger.info("login succeed");
      result = true;
    } else {
      logger.info(`login failed - wrong password ( user id "${name}" )`);
    }
  } catch (e) {
    logger.info(`login failed - wrong account`);
  }
  return result;
};

const check_name = async (name: string) => {
  let result = false;
  try {
    const [rows]: any = await mysql.query(`SELECT EXISTS(SELECT * FROM member.user WHERE user_name='${name}' ) AS isChk`);
    if (rows[0].isChk === 0) result = true;
  } catch (e: any) {
    logger.error(`Check Error in member.user(function[check_name]) - ${e.code}`);
  }
  return result;
};

export { signup, login, check_name };
// signup("hoho", "password", "1", "1");

// login("hclee", "password");
