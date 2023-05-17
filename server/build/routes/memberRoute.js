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
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../jwt");
const member_1 = require("../member");
const router = express_1.default.Router();
// router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const { accessToken } = req.cookies;
//   console.log(accessToken);
//   try {
//     const decode = decodePayLoad(accessToken);
//     console.log(decode);
//   } catch (e: any) {
//     console.log(e.error);
//   }
//   res.status(200).send({
//     result: true,
//   });
// });
router.get("/checkname", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    console.log(name);
    const result = yield (0, member_1.check_name)(name);
    res.status(200).send({
        result: result,
    });
}));
router.post("/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const phone = req.body.phone;
    const login_type = req.body.login_type;
    const auth_type = req.body.auth_type;
    console.log(name, password, email, phone, login_type, auth_type);
    const result = yield (0, member_1.signup)(name, password, email, phone, login_type, auth_type);
    console.log(req.body);
    res.status(200).send({
        result: result,
    });
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const password = req.body.password;
    let code = 200;
    let message = "login success";
    let accessToken = "";
    const result = yield (0, member_1.login)(name, password);
    if (result) {
        accessToken = (0, jwt_1.makeAccessToken)({ name: name });
        const refreshToken = (0, jwt_1.makeRefreshToken)({ name: name });
        res.cookie("refreshToken", refreshToken, {
            secure: false,
            httpOnly: true,
            // sameSite: "lax",
        });
    }
    else {
        code = 401;
        message = "Not Authorized";
    }
    res.status(code).send({
        message: message,
        at: accessToken,
        name: name,
    });
}));
router.post("/silent", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let code = 200;
    let message = "silent_refresh success";
    let accessToken = "";
    const refreshToken = req.cookies.refreshToken;
    let refreshToken2 = "";
    let name = "";
    if (refreshToken) {
        try {
            const checkResult = (0, jwt_1.decodeRefresh)(refreshToken);
            accessToken = (0, jwt_1.makeAccessToken)({ name: checkResult.name });
            refreshToken2 = (0, jwt_1.makeRefreshToken)({ name: checkResult.name });
            name = checkResult.name;
        }
        catch (e) {
            console.log(e);
            code = 401; // 리프레시토큰 만료
            message = "not login";
        }
    }
    else {
        code = 401; // 리프레시토큰 없음
        message = "not login";
    }
    res.cookie("refreshToken", refreshToken2, {
        secure: false,
        httpOnly: true,
        // sameSite: "lax",
    });
    res.status(code).send({
        // result: result,
        message: message,
        at: accessToken,
        name: name,
    });
}));
router.post("/logout", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let code = 200;
    let message = "logout success";
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        try {
            const checkResult = (0, jwt_1.decodeRefresh)(refreshToken);
        }
        catch (e) {
            code = 401; // 리프레시토큰 만료
            message = "login has expired";
        }
    }
    else {
        code = 401; // 리프레시토큰 없음
        message = "not login";
    }
    res.cookie("refreshToken", "", {
        secure: false,
        httpOnly: true,
        // sameSite: "lax",
    });
    res.status(code).send({
        message: message,
    });
}));
exports.default = router;
