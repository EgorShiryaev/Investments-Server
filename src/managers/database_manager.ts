import { RunResult } from "sqlite3";
import DATABASE from "../database";
import DatabaseResponse from "./models/database_response";

const createTableIfNotExists = (tableTitle: string, columns: string) => {
  const sqlScript = `CREATE TABLE IF NOT EXISTS ${tableTitle} (id INTEGER NOT NULL, ${columns}, PRIMARY KEY (id))`;
  console.log(sqlScript);

  DATABASE.serialize(() => {
    DATABASE.run(sqlScript, () => {
      console.log(`Success create table ${tableTitle}`);
    });
  });
};

const getAll = <T>(tableTitle: string, where: string): Promise<T[]> => {
  const sqlScript = `SELECT * FROM ${tableTitle} WHERE ${where}`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.all(sqlScript, [], (error, rows) => {
        if (error) {
          console.log("Select error", error);
          reject(error);
        }
        resolve(rows as T[]);
      });
    });
  });
};

const insert = (
  tableTitle: string,
  columns: string,
  values: string
): Promise<DatabaseResponse> => {
  const sqlScript = `INSERT INTO ${tableTitle} (${columns}) VALUES (${values})`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, (_: RunResult, error: Error | null) => {
        if (error) {
          console.log("Insert error: " + error);
          reject({ success: false, message: error });
        } else {
          resolve({ success: true });
        }
      });
    });
  });
};

const update = (
  tableTitle: string,
  set: string,
  where: string
): Promise<DatabaseResponse>  => {
  const sqlScript = `UPDATE ${tableTitle} SET ${set} WHERE ${where}`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, (_: RunResult, error: Error | null) => {
        if (error) {
          console.log("Update error: " + error);
          reject({ success: false, message: error });
        } else {
          resolve({ success: true });
        }
      });
    });
  });
};

const remove = (
  tableTitle: string,
  where: string
): Promise<DatabaseResponse>  => {
  const sqlScript = `DELETE ${tableTitle} WHERE ${where}`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, (error) => {
        if (error) {
          console.log("Delete error: " + error);
          reject({ success: false, message: error });
        } else {
          resolve({ success: true });
        }
      });
    });
  });
};

export default {
  createTableIfNotExists,
  getAll,
  insert,
  update,
  remove,
};
