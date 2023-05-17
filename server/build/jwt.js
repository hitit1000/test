"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRefresh = exports.decodePayLoad = exports.makeRefreshToken = exports.makeAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const makeAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, String(config_1.tokenConfig.accessKey), { expiresIn: "1m", issuer: "architecogroup" });
    // 30m
};
exports.makeAccessToken = makeAccessToken;
const makeRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, String(config_1.tokenConfig.refreshKey), { expiresIn: "24h", issuer: "architecogroup" });
};
exports.makeRefreshToken = makeRefreshToken;
const decodePayLoad = (token) => {
    return jsonwebtoken_1.default.verify(token, String(config_1.tokenConfig.accessKey));
};
exports.decodePayLoad = decodePayLoad;
const decodeRefresh = (token) => {
    return jsonwebtoken_1.default.verify(token, String(config_1.tokenConfig.refreshKey));
};
exports.decodeRefresh = decodeRefresh;
