"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
require("dotenv/config");
const config_1 = require("../config");
const winston_1 = __importDefault(require("../log/winston"));
const db = mysql_1.default.createConnection(config_1.databaseConfig);
db.connect((err) => {
    if (err) {
        winston_1.default.error(`[database_connection] error_name:${err.name}\nerror_message:${err.message}`);
        return;
    }
    winston_1.default.info(`[database_connection] thread id ${db.threadId}`);
});
db.on("connection", () => {
    console.log("action::db::connect");
});
db.on("error", (err) => {
    console.log("Error::db::???");
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("catch!!!!!!!!!!!!!!!!!!!", err.code);
    }
});
exports.default = db;
