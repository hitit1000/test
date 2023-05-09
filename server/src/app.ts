process.env.NODE_ENV = process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == "production" ? "production" : "development";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
require("dotenv").config({ path: path.join(__dirname, "./env/server.env") }); //dotenv : env 로드 모듈 server.env 환경변수 가져오기
import logger from "./log/winston";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import memberRoute from "./routes/memberRoute";
import lawRoute from "./routes/lawRoute";

const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
// 기존 combined 포멧에서 timestamp만 제거
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : combined; // NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발
console.log(morganFormat);
const port = process.env.PORT || 5000;
const app = express();

// 미들웨어
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(morganFormat, { stream: logger.stream })); // morgan 로그 설정
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// 라우터
app.use("/member", memberRoute);
app.use("/law", lawRoute);

console.log("test", process.env.NODE_ENV);
app.get("/test/info", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.headers);
  logger.info("info test");
  logger.warn("warning test");
  logger.error("error test");
  logger.debug("debug test");
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

app.listen(port, () => logger.info(`Server Start Listening on port ${port}`));
