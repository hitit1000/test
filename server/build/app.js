"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == "production" ? "production" : "development";
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(__dirname, "./env/server.env") }); //dotenv : env 로드 모듈 server.env 환경변수 가져오기
const winston_1 = __importDefault(require("./log/winston"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const memberRoute_1 = __importDefault(require("./routes/memberRoute"));
const lawRoute_1 = __importDefault(require("./routes/lawRoute"));
const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
// 기존 combined 포멧에서 timestamp만 제거
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined; // NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발
console.log(morganFormat);
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
// 미들웨어
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)(morganFormat, { stream: winston_1.default.stream })); // morgan 로그 설정
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, cookie_parser_1.default)());
// 라우터
app.use("/member", memberRoute_1.default);
app.use("/law", lawRoute_1.default);
console.log("test", process.env.NODE_ENV);
app.get("/test/info", (req, res, next) => {
    console.log(req.headers);
    winston_1.default.info("info test");
    winston_1.default.warn("warning test");
    winston_1.default.error("error test");
    winston_1.default.debug("debug test");
    res.status(200).send({
        message: "info test!",
    });
});
app.get("/test/warn", (req, res, next) => {
    res.status(400).send({
        message: "warning test!",
    });
});
app.get("/test/error", (req, res, next) => {
    res.status(500).send({
        message: "error test!",
    });
});
app.listen(port, () => winston_1.default.info(`Server Start Listening on port ${port}`));
