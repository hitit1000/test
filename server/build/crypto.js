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
exports.makePasswordHashed = exports.createHashedPassword = exports.createSalt = void 0;
const crypto_1 = __importDefault(require("crypto"));
const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto_1.default.randomBytes(64, (err, buf) => {
            if (err)
                reject(err);
            resolve(buf.toString("base64"));
        });
    });
};
exports.createSalt = createSalt;
const createHashedPassword = (plainPassword) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield createSalt();
        crypto_1.default.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
            if (err)
                reject(err);
            resolve({ password: key.toString("base64"), salt });
        });
    }));
};
exports.createHashedPassword = createHashedPassword;
const makePasswordHashed = (plainPassword, salt) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        crypto_1.default.pbkdf2(plainPassword, salt, 9999, 64, "sha512", (err, key) => {
            if (err)
                reject(err);
            resolve(key.toString("base64"));
        });
    }));
};
exports.makePasswordHashed = makePasswordHashed;
