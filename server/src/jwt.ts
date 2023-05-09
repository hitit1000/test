import jwt from "jsonwebtoken";
import { tokenConfig } from "./config";

const makeAccessToken = (payload: object) => {
  return jwt.sign(payload, String(tokenConfig.accessKey), { expiresIn: "1m", issuer: "architecogroup" });
  // 30m
};
const makeRefreshToken = (payload: object) => {
  return jwt.sign(payload, String(tokenConfig.refreshKey), { expiresIn: "24h", issuer: "architecogroup" });
};

const decodePayLoad = (token: string) => {
  return jwt.verify(token, String(tokenConfig.accessKey));
};

const decodeRefresh = (token: string) => {
  return jwt.verify(token, String(tokenConfig.refreshKey));
};

export { makeAccessToken, makeRefreshToken, decodePayLoad, decodeRefresh };
