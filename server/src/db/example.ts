import mysql from "./pool";
let a = 0;
const test = async () => {
  const [rows] = await mysql.query("select * from terms.terms;");
  a += 1;
  console.log(rows, a);
};

setInterval(test, 10000);
