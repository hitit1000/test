"use strict";
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
const crypto_1 = require("./crypto");
const pool_1 = __importDefault(require("./db/pool"));
const winston_1 = __importDefault(require("./log/winston"));
const signup = (name, plainPassword, email, phone, login_type, auth_type) => __awaiter(void 0, void 0, void 0, function* () {
    let result = true;
    const conn = yield pool_1.default.getConnection();
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
    console.log(result);
});
let a = 1050;
setInterval(() => {
    a += 1;
    signup(String(a), "plainPassword", "email@email.com", "01012341234", 1, 1);
}, 5000);
// start();
