const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
import process from "process";

const { combine, timestamp, printf, colorize } = winston.format;

const logDir = `${process.cwd()}/logs`; // logs 디렉토리 하위에 로그 파일 저장

const logFormat = printf((info: any) => {
  return `${info.timestamp} [${info.level}] ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/info",
      filename: `%DATE%.log`, // file 이름 날짜로 저장
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // warn 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "warn",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/warn",
      filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    // http 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: "http",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/http", // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.http.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
  exceptionHandlers: [
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "exception",
      filename: `%DATE%.exception.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

logger.stream = {
  // morgan wiston 설정
  write: (message: any) => {
    logger.http(message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ""));
  },
};

// Production 환경이 아닌 경우(dev 등) 배포 환경에서는 최대한 자원을 안잡아 먹는 로그를 출력해야함
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
        logFormat // log format 적용
      ),
    })
  );
}

// module.exports = logger;
export default logger;
