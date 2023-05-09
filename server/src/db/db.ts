import sql from "mysql";
import "dotenv/config";
import { databaseConfig } from "../config";
import logger from "../log/winston";

const db = sql.createConnection(databaseConfig);

db.connect((err) => {
  if (err) {
    logger.error(`[database_connection] error_name:${err.name}\nerror_message:${err.message}`);
    return;
  }
  logger.info(`[database_connection] thread id ${db.threadId}`);
});

db.on("connection", () => {
  console.log("action::db::connect");
});

db.on("error", (err) => {
  console.log("Error::db::???");
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("catch!!!!!!!!!!!!!!!!!!!", err.code);
  }
});

export default db;
