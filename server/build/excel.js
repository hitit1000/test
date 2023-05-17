"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lawReview = exports.lawInputList = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
let XLSX_CALC = require("xlsx-calc");
const lawReview = (data) => {
    var _a;
    const input2 = [
        { sheet: "#1 - 메인 UI", cell: "F13", value: "그 외" },
        { sheet: "#1 - 메인 UI", cell: "F15", value: "공공기관" },
        { sheet: "#1 - 메인 UI", cell: "F17", value: "공동주택" },
        { sheet: "#1 - 메인 UI", cell: "F19", value: "1000" },
        { sheet: "#1 - 메인 UI", cell: "F21", value: "건축허가" },
        { sheet: "#1 - 메인 UI", cell: "F23", value: "50000" },
        { sheet: "#1 - 메인 UI", cell: "F25", value: "90000" },
        { sheet: "#1 - 메인 UI", cell: "F27", value: "20000" },
        { sheet: "#1 - 메인 UI", cell: "F29", value: "20" },
        { sheet: "#1 - 메인 UI", cell: "L13", value: "신축" },
        { sheet: "#1 - 메인 UI", cell: "L15", value: "난방 적용 건축물" },
        { sheet: "#1 - 메인 UI", cell: "L17", value: "200m 이내 교육시설 존재" },
        { sheet: "#1 - 메인 UI", cell: "L19", value: "도시정비사업 해당" },
        { sheet: "#1 - 메인 UI", cell: "L21", value: "한강 수계 지역" },
    ];
    const input = [
        { sheet: "#1 - 메인 UI", cell: "F13", value: data.region },
        { sheet: "#1 - 메인 UI", cell: "F15", value: data.client },
        { sheet: "#1 - 메인 UI", cell: "F17", value: data.usage },
        { sheet: "#1 - 메인 UI", cell: "F19", value: data.number_of_households },
        { sheet: "#1 - 메인 UI", cell: "F21", value: data.approval },
        { sheet: "#1 - 메인 UI", cell: "F23", value: data.land_area },
        { sheet: "#1 - 메인 UI", cell: "F25", value: data.floor_area },
        { sheet: "#1 - 메인 UI", cell: "F27", value: data.parking_area },
        { sheet: "#1 - 메인 UI", cell: "F29", value: data.number_of_floors },
        { sheet: "#1 - 메인 UI", cell: "L13", value: data.construct },
        { sheet: "#1 - 메인 UI", cell: "L15", value: data.heating },
        { sheet: "#1 - 메인 UI", cell: "L17", value: data.education },
        { sheet: "#1 - 메인 UI", cell: "L19", value: data.maintenance },
        { sheet: "#1 - 메인 UI", cell: "L21", value: data.rivers },
    ];
    const templateName = "passwordno.xlsx";
    const workbook = xlsx_1.default.readFile(`template/${templateName}`);
    input.forEach((i) => {
        workbook.Sheets[i.sheet][i.cell].v = i.value;
    });
    XLSX_CALC(workbook);
    const resultSheet = workbook.Sheets["판정결과LIST"];
    const lastRow = Number((_a = resultSheet["!ref"]) === null || _a === void 0 ? void 0 : _a.split(":")[1].replace(/[^0-9]/g, "")); //현재 시트에서 마지막 행값을 추출
    let category = "";
    let result = {};
    for (let rowCount = 1; rowCount <= lastRow; rowCount++) {
        if (resultSheet[`B${rowCount}`]) {
            if (resultSheet[`A${rowCount}`]) {
                category = resultSheet[`A${rowCount}`].v;
                result[category] = [];
            }
            if (resultSheet[`D${rowCount}`] != undefined && resultSheet[`D${rowCount}`].v === 1) {
                result[category].push(resultSheet[`B${rowCount}`].v);
            }
        }
    }
    return result;
};
exports.lawReview = lawReview;
const lawInputList = () => {
    var _a;
    const templateName = "passwordno.xlsx";
    const workbook = xlsx_1.default.readFile(`template/${templateName}`);
    const sheet = workbook.Sheets["입력값 리스트(데이터 유효성)"];
    const lastRow = Number((_a = sheet["!ref"]) === null || _a === void 0 ? void 0 : _a.split(":")[1].replace(/[^0-9]/g, "")); //현재 시트에서 마지막 행값을 추출
    let category = "";
    let result = {};
    for (let rowCount = 2; rowCount <= lastRow; rowCount++) {
        if (sheet[`C${rowCount}`]) {
            if (sheet[`B${rowCount}`]) {
                category = sheet[`B${rowCount}`].v;
                result[category] = [];
            }
            result[category].push(sheet[`C${rowCount}`].v);
        }
    }
    return result;
};
exports.lawInputList = lawInputList;
