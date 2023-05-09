import mysql2 from "mysql2/promise";
import { databasePoolConfig } from "../config";

const mysql = mysql2.createPool(databasePoolConfig);

const getConnection = () => {
  const pool = mysql.getConnection();
  return pool;
};

export default mysql;
export { getConnection };
