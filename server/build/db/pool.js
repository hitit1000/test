"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../config");
const mysql = promise_1.default.createPool(config_1.databasePoolConfig);
const getConnection = () => {
    const pool = mysql.getConnection();
    return pool;
};
exports.getConnection = getConnection;
exports.default = mysql;
