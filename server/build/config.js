"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenConfig = exports.databasePoolConfig = exports.databaseConfig = void 0;
require("dotenv/config");
exports.databaseConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
exports.databasePoolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
};
exports.tokenConfig = {
    accessKey: process.env.ACCESS_TOKEN_SECRET,
    refreshKey: process.env.REFRESH_TOKEN_SECRET,
};
