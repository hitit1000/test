import express from "express";
import { lawInputList, lawReview } from "../excel";
import { typeLawReview } from "../types";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const inputList = lawInputList();
  res.status(200).send({
    inputList,
  });
});

router.get("/review", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data: typeLawReview = {
    region: req.query.region as string,
    client: req.query.client as string,
    usage: req.query.usage as string,
    approval: req.query.approval as string,
    number_of_households: (req.query.number_of_households as string).replaceAll(/,/g, ""),
    land_area: (req.query.land_area as string).replaceAll(/,/g, ""),
    floor_area: (req.query.floor_area as string).replaceAll(/,/g, ""),
    parking_area: (req.query.parking_area as string).replaceAll(/,/g, ""),
    number_of_floors: (req.query.number_of_floors as string).replaceAll(/,/g, ""),
    construct: req.query.construct as string,
    heating: req.query.heating as string,
    education: req.query.education as string,
    maintenance: req.query.maintenance as string,
    rivers: req.query.rivers as string,
  };
  const review = lawReview(data);
  res.status(200).send({
    review,
  });
});
export default router;
