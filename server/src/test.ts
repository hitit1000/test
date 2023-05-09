import { createHashedPassword } from "./crypto";
import mysql from "./db/pool";
import logger from "./log/winston";

const signup = async (name: string, plainPassword: string, email: string, phone: string, login_type: string | number, auth_type: string | number) => {
  let result = true;
  const conn = await mysql.getConnection();
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
  console.log(result);
};
let a = 1050;
setInterval(() => {
  a += 1;
  signup(String(a), "plainPassword", "email@email.com", "01012341234", 1, 1);
}, 5000);
// start();
