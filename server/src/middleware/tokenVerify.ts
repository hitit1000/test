import express from "express";
import { decodePayLoad } from "../jwt";
import logger from "../log/winston";

const tokenVerify = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.get("authorization") !== undefined) {
    const req_token = req.get("authorization");
    const access_token = req_token?.substring(7);

    if (access_token !== "null") {
      const auth_jwt = decodePayLoad(String(access_token));
      if (auth_jwt) {
        logger.info("Access Token available");
        next();
      } else {
        logger.warn("Access Token expiration");
        res.status(403).send({
          message: "Access Token expiration",
        });
      }
    } else {
      logger.warn("Access Token none");
      res.status(403).send({
        message: "Access Token none",
      });
    }
  } else {
    logger.warn("Access Token undefined");
    res.status(405).send({
      message: "No permission",
    });
  }
};

export default tokenVerify;
