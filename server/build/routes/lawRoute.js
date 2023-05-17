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
const excel_1 = require("../excel");
const router = express_1.default.Router();
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const inputList = (0, excel_1.lawInputList)();
    res.status(200).send({
        inputList,
    });
}));
router.get("/review", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        region: req.query.region,
        client: req.query.client,
        usage: req.query.usage,
        approval: req.query.approval,
        number_of_households: req.query.number_of_households.replaceAll(/,/g, ""),
        land_area: req.query.land_area.replaceAll(/,/g, ""),
        floor_area: req.query.floor_area.replaceAll(/,/g, ""),
        parking_area: req.query.parking_area.replaceAll(/,/g, ""),
        number_of_floors: req.query.number_of_floors.replaceAll(/,/g, ""),
        construct: req.query.construct,
        heating: req.query.heating,
        education: req.query.education,
        maintenance: req.query.maintenance,
        rivers: req.query.rivers,
    };
    const review = (0, excel_1.lawReview)(data);
    res.status(200).send({
        review,
    });
}));
exports.default = router;
