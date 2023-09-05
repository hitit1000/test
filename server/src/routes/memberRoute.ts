import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { makeAccessToken, makeRefreshToken, decodePayLoad, decodeRefresh } from "../jwt";
import { check_name, login, signup } from "../member";
import logger from "../log/winston";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let code = 200;
  const oldAccessToken = req.header("Authorization");
  let accessToken = oldAccessToken ? oldAccessToken : "";
  accessToken = accessToken.includes("Bearer ") ? accessToken.substring(7) : accessToken;
  const refreshToken = req.cookies.rt;
  // console.log("at=", accessToken, "\nrt=", refreshToken);
  try {
    const decode = decodePayLoad(accessToken) as JwtPayload;
    console.log("AT 성공");
    logger.info(`[auth]success - id : ${decode.id}`);
  } catch (e: any) {
    // console.log("AT error_message = ", e.message);
    if (e.message === "jwt expired") {
      console.log("AT 실패");
      try {
        const decode: JwtPayload = decodeRefresh(refreshToken) as JwtPayload;
        accessToken = makeAccessToken({ name: decode.name });
        console.log("RT 성공");
      } catch (e: any) {
        code = 401; // 리프레시토큰 만료
        console.log("RT 실패");
        // console.log("RT error_message =>", e.message);
        res.cookie("rt", "", {
          secure: false,
          httpOnly: true,
          // sameSite: "lax",
        });
      }
    } else {
      // 기간 만료를 제외한 모든 에러 (  )
      code = 401;
      console.log(e.message);
    }
    // jwt must be provided
    // jwt expired
  }
  res.status(code).send({
    // result: result,
    // message: message,
    at: accessToken,
  });
});

router.get("/checkname", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const name: string = req.query.name as string;
  console.log(name);
  const result = await check_name(name);
  res.status(200).send({
    result: result,
  });
});

router.post("/signup", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const name: string = req.body.id as string;
  const password: string = req.body.password as string;
  const email: string = req.body.email as string;
  const phone: string = req.body.phone as string;
  const login_type: number = req.body.login_type as number;
  const auth_type: number = req.body.auth_type as number;
  const result = await signup(name, password, email, phone, login_type, auth_type);
  res.status(200).send({
    result: result,
  });
});

router.post("/login", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const id: string = req.body.id as string;
  const password: string = req.body.password as string;
  let code = 200;
  let message = "login success";
  let accessToken = "";
  const result = await login(id, password);
  if (result) {
    accessToken = makeAccessToken({ id: id });
    const refreshToken = makeRefreshToken({ id: id });
    res.cookie("rt", refreshToken, {
      secure: false,
      httpOnly: true,
      // sameSite: "lax",
    });
    logger.info(`[login]success - id : ${id}`);
  } else {
    code = 401;
    message = "Not Authorized";
    logger.info(`[login]fail - id : ${id}`);
  }
  res.status(code).send({
    // message: message,
    at: accessToken,
    id: id,
  });
});

router.post("/silent", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let code = 200;
  let message = "silent_refresh success";
  let accessToken = "";
  const refreshToken = req.cookies.rt;
  let newRefreshToken = "";
  let name = "";
  if (refreshToken) {
    try {
      const checkResult: JwtPayload = decodeRefresh(refreshToken) as JwtPayload;
      accessToken = makeAccessToken({ name: checkResult.name });
      newRefreshToken = makeRefreshToken({ name: checkResult.name });
      name = checkResult.name;
      logger.info(`[silent]success - id : ${name}`);
    } catch (e) {
      console.log(e);
      code = 401; // 리프레시토큰 만료
      message = "not login";
      logger.info(`[silent]fail - id : ${name}`);
    }
  } else {
    code = 401; // 리프레시토큰 없음
    message = "not login";
    logger.info(`[silent]fail - id : ${name}`);
  }
  res.cookie("rt", newRefreshToken, {
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
});

router.post("/logout", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let code = 200;
  let message = "logout success";
  const refreshToken = req.cookies.rt;
  if (refreshToken) {
    try {
      const checkResult: JwtPayload = decodeRefresh(refreshToken) as JwtPayload;
    } catch (e) {
      code = 401; // 리프레시토큰 만료
      message = "login has expired";
    }
  } else {
    code = 401; // 리프레시토큰 없음
    message = "not login";
  }

  res.cookie("rt", "", {
    secure: false,
    httpOnly: true,
    // sameSite: "lax",
  });
  res.status(code).send({
    message: message,
  });
});

export default router;
