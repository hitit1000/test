"use strict";
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const ExcelJS = require("exceljs");
// const excelOpen = async () => {
//   const workbook = new ExcelJS.Workbook();
//   await workbook.xlsx.readFile("./test.xlsx");
//   console.log(workbook.getWorksheet("Sheet1"));
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//   return workbook;
// };
// excelOpen();
// const test = async () => {
// const workbook = new ExcelJS.Workbook();
// workbook.calcProperties.fullCalcOnLoad = true;
// await workbook.xlsx.readFile("./passwordno.xlsx");
// const workSheet = workbook.getWorksheet("#1 - 메인 UI");
// console.log("test = ", workSheet.getCell(13, 6).value);
// console.log("test = ", workSheet.getCell(13, 19).value);
// console.log("test = ", workSheet.getCell(19, 16).value);
// workSheet.getCell(13, 6).value = "그 외";
// // workSheet.getCell(19, 16).formula = "판정결과LIST!D28";
// console.log("test = ", workSheet.getCell(13, 6).value);
// console.log("test = ", workSheet.getCell(13, 19).value);
// console.log("test = ", workSheet.getCell(19, 16).value);
// await workbook.xlsx.readFile("./test.xlsx");
// const workSheet = workbook.getWorksheet("Sheet1");
// console.log("test = ", (workSheet.getCell(1, 1).value = 5));
// console.log("result = ");
// console.log(workSheet.getCell("C1").formula);
// console.log((workSheet.getCell("C1").formula = "A1+A2"));
// console.log((workSheet.getCell("C1").value = { formula: "A1+A1" }));
// console.log(workSheet.getCell("C1").value);
// worksheet.getCell("A3").result === 7;
// await workbook.xlsx.write("./test2.xlsx");
// };
// test();
// // Create a Workbook⬆
// const workbook = new ExcelJS.Workbook();
// // Set Workbook Properties⬆
// workbook.creator = "Me";
// workbook.lastModifiedBy = "Her";
// workbook.created = new Date(1985, 8, 30);
// workbook.modified = new Date();
// workbook.lastPrinted = new Date(2016, 9, 27);
// // Set Calculation Properties⬆
// // Force workbook calculation on load
// workbook.calcProperties.fullCalcOnLoad = true;
// // Workbook Views⬆
// // The Workbook views controls how many separate windows Excel will open when viewing the workbook.
// workbook.views = [
//   {
//     x: 0,
//     y: 0,
//     width: 10000,
//     height: 20000,
//     firstSheet: 0,
//     activeTab: 1,
//     visibility: "visible",
//   },
// ];
// // Add a Worksheet⬆
// const sheetOption = {
//   pageSetup: {
//     margins: { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 },
//     printArea: "A1:G20", // 'A1:G10&&A11:G20'
//     printTitlesRow: "1:3",
//     printTitlesColumn: "A:C",
//     paperSize: 9,
//     headerFooter: {
//       firstHeader: "hello Exceljs",
//       firstFooter: "goodbye exceljs",
//       oddFooter: "&Lexceljs&C&F&RPage &P",
//     },
//   },
// };
// const sheet = workbook.addWorksheet("My Sheet", sheetOption);
// console.log(sheet);
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 변경 후 읽기 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const xlsx_1 = __importDefault(require("xlsx"));
let XLSX_CALC = require("xlsx-calc");
const templateName = "passwordno.xlsx";
const input = [
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
const workbook = xlsx_1.default.readFile(templateName);
input.forEach((i) => {
    workbook.Sheets[i.sheet][i.cell].v = i.value;
});
// XLSX_CALC(workbook);
const resultSheet = workbook.Sheets["판정결과LIST"];
const scanResultSheet = () => {
    var _a;
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
console.log(scanResultSheet());
