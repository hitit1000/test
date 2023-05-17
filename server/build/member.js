"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_name = exports.login = exports.signup = void 0;
const crypto_1 = require("./crypto");
const pool_1 = __importStar(require("./db/pool"));
const winston_1 = __importDefault(require("./log/winston"));
const signup = (name, plainPassword, email, phone, login_type, auth_type) => __awaiter(void 0, void 0, void 0, function* () {
    let result = true;
    const conn = yield (0, pool_1.getConnection)();
    yield conn.beginTransaction();
    try {
        const { password, salt } = yield (0, crypto_1.createHashedPassword)(plainPassword);
        const [rows] = yield conn.query(`INSERT INTO member.user (user_name,login_type,auth_type) VALUES ('${name}',${login_type},${auth_type});`);
        const user_id = rows.insertId;
        yield conn.query(`INSERT INTO auth.password (user_no,salt,password) VALUES (${user_id},'${salt}','${password}');`);
        yield conn.query(`INSERT INTO member.auth_individual (user_no,cell_phone,email) VALUES (${user_id},'${phone}','${email}');`);
        yield conn.commit();
    }
    catch (e) {
        yield conn.rollback();
        result = false;
        winston_1.default.error(`Signup Error - code : ${e.code} / sql : ${e.sql} / sqlMessage: ${e.sqlMessage}`);
    }
    finally {
        conn.release(); // pool 을 돌려주는 역할을 한다.
        // mysql.end();
    }
    return result;
});
exports.signup = signup;
const signup2 = (name, plainPassword, email, phone, login_type, auth_type) => __awaiter(void 0, void 0, void 0, function* () {
    let msg = "";
    let result = false;
    try {
        let user_id;
        const [rows] = yield pool_1.default.query(`SELECT EXISTS(SELECT * FROM member.user WHERE user_name='${name}' ) AS isChk`);
        if (rows[0].isChk === 0) {
            // 동일한 ID가 없음
            const { password, salt } = yield (0, crypto_1.createHashedPassword)(plainPassword);
            try {
                const [rows] = yield pool_1.default.query(`INSERT INTO member.user (user_name,login_type,auth_type) VALUES ('${name}',1,1);`);
                user_id = rows.insertId;
            }
            catch (e) {
                msg = "insert data in member.user";
                winston_1.default.error(`${msg} - ${e.code}`);
            }
            if (msg === "") {
                // 위의 ID 등록 시 정상이면 실행
                try {
                    yield pool_1.default.query(`INSERT INTO auth.password (user_no,salt,password) VALUES (${user_id},'${salt}','${password}');`);
                }
                catch (e) {
                    msg = "insert data in auth.password";
                    winston_1.default.error(`${msg} - ${e.code}`);
                    try {
                        yield pool_1.default.query(`DELETE FROM member.user WHERE user_name = '${name}'`);
                    }
                    catch (e) {
                        msg = "delete data in member.user";
                        winston_1.default.error(`${msg} - ${e.code}`);
                    }
                }
            }
            if (msg === "") {
                // 위의 아이디, 패스워드 등록 시 정상이면 실행
                try {
                    yield pool_1.default.query(`INSERT INTO auth_individual (user_no,cell_phone,email) VALUES (${user_id},'${phone}','${email}');`);
                    msg = "Account registration successful";
                    result = true;
                    winston_1.default.info("Account registration successful");
                }
                catch (e) {
                    msg = "insert data inauth_individual";
                    winston_1.default.error(`${msg} - ${e.code}`);
                    try {
                        yield pool_1.default.query(`DELETE FROM member.user WHERE user_name = '${name}'`);
                    }
                    catch (e) {
                        msg = "delete data in member.user";
                        winston_1.default.error(`${msg} - ${e.code}`);
                    }
                    try {
                        yield pool_1.default.query(`DELETE FROM auth.password WHERE user_name = '${name}'`);
                    }
                    catch (e) {
                        msg = "delete data in auth.password";
                        winston_1.default.error(`${msg} - ${e.code}`);
                    }
                }
            }
        }
        else {
            // 동일한 ID가 있음
            winston_1.default.error("Account already registered");
            msg = "Account already registered";
        }
    }
    catch (e) {
        msg = "Check Error in member.user";
        winston_1.default.error(`${msg} - ${e.code}`);
    }
    return { result: result, msg: msg };
});
const login = (name, plainPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let result = false;
    const [rows] = yield pool_1.default.query(`SELECT auth.password.salt,auth.password.password FROM member.user right OUTER JOIN auth.password ON member.user.user_no = auth.password.user_no WHERE member.user.user_name='${name}'`);
    const dbPassword = rows[0].password;
    const dbSalt = rows[0].salt;
    const password = yield (0, crypto_1.makePasswordHashed)(plainPassword, dbSalt);
    if (password === dbPassword) {
        // 로그인 성공
        winston_1.default.info("login succeed");
        result = true;
    }
    else {
        // 로그인 실패
        winston_1.default.info("login failed");
    }
    return result;
});
exports.login = login;
const check_name = (name) => __awaiter(void 0, void 0, void 0, function* () {
    let result = false;
    try {
        const [rows] = yield pool_1.default.query(`SELECT EXISTS(SELECT * FROM member.user WHERE user_name='${name}' ) AS isChk`);
        if (rows[0].isChk === 0)
            result = true;
    }
    catch (e) {
        winston_1.default.error(`Check Error in member.user(function[check_name]) - ${e.code}`);
    }
    return result;
});
exports.check_name = check_name;
// signup("hoho", "password", "1", "1");
// login("hclee", "password");
