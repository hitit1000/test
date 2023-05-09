import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { makeAccessToken, makeRefreshToken, decodePayLoad, decodeRefresh } from "../jwt";
import { check_name, login, signup } from "../member";

const router = express.Router();

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

router.get("/checkname", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const name: string = req.query.name as string;
  console.log(name);
  const result = await check_name(name);
  res.status(200).send({
    result: result,
  });
});

router.post("/signup", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const name: string = req.body.name as string;
  const password: string = req.body.password as string;
  const email: string = req.body.email as string;
  const phone: string = req.body.phone as string;
  const login_type: number = req.body.login_type as number;
  const auth_type: number = req.body.auth_type as number;
  console.log(name, password, email, phone, login_type, auth_type);
  const result = await signup(name, password, email, phone, login_type, auth_type);
  console.log(req.body);
  res.status(200).send({
    result: result,
  });
});

router.post("/login", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const name: string = req.body.name as string;
  const password: string = req.body.password as string;
  let code = 200;
  let message = "login success";
  let accessToken = "";
  const result = await login(name, password);
  if (result) {
    accessToken = makeAccessToken({ name: name });
    const refreshToken = makeRefreshToken({ name: name });
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      // sameSite: "lax",
    });
  } else {
    code = 401;
    message = "Not Authorized";
  }
  res.status(code).send({
    message: message,
    at: accessToken,
    name: name,
  });
});

router.post("/silent", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let code = 200;
  let message = "silent_refresh success";
  let accessToken = "";
  const refreshToken = req.cookies.refreshToken;
  let refreshToken2 = "";
  let name = "";
  if (refreshToken) {
    try {
      const checkResult: JwtPayload = decodeRefresh(refreshToken) as JwtPayload;
      accessToken = makeAccessToken({ name: checkResult.name });
      refreshToken2 = makeRefreshToken({ name: checkResult.name });
      name = checkResult.name;
    } catch (e) {
      console.log(e);
      code = 401; // 리프레시토큰 만료
      message = "not login";
    }
  } else {
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
});

router.post("/logout", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let code = 200;
  let message = "logout success";
  const refreshToken = req.cookies.refreshToken;
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

  res.cookie("refreshToken", "", {
    secure: false,
    httpOnly: true,
    // sameSite: "lax",
  });
  res.status(code).send({
    message: message,
  });
});

export default router;
