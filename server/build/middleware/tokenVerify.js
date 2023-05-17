"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../jwt");
const winston_1 = __importDefault(require("../log/winston"));
const tokenVerify = (req, res, next) => {
    if (req.get("authorization") !== undefined) {
        const req_token = req.get("authorization");
        const access_token = req_token === null || req_token === void 0 ? void 0 : req_token.substring(7);
        if (access_token !== "null") {
            const auth_jwt = (0, jwt_1.decodePayLoad)(String(access_token));
            if (auth_jwt) {
                winston_1.default.info("Access Token available");
                next();
            }
            else {
                winston_1.default.warn("Access Token expiration");
                res.status(403).send({
                    message: "Access Token expiration",
                });
            }
        }
        else {
            winston_1.default.warn("Access Token none");
            res.status(403).send({
                message: "Access Token none",
            });
        }
    }
    else {
        winston_1.default.warn("Access Token undefined");
        res.status(405).send({
            message: "No permission",
        });
    }
};
exports.default = tokenVerify;
