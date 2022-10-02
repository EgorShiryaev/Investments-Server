import { RunResult } from "sqlite3";
import DATABASE from "../database";

const createTableIfNotExists = (tableTitle: string, columns: string) => {
  const sqlScript = `CREATE TABLE IF NOT EXISTS ${tableTitle} (id INTEGER NOT NULL AUTO_INCREMENT, ${columns}, PRIMARY KEY (id))`;
  console.log(sqlScript);

  DATABASE.serialize(() => {
    DATABASE.run(sqlScript, () => {
      console.log(`Success create table ${tableTitle}`);
    });
  });
};

const getAll = (tableTitle: string, where: string) => {
  const sqlScript = `SELECT * FROM ${tableTitle} WHERE ${where}`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.all(sqlScript, [], (error, rows) => {
        if (error) {
          console.log("Select error", error);
          reject(error);
        }
        resolve(rows);
      });
    });
  });
};

const insert = (tableTitle: string, columns: string, values: string) => {
  const sqlScript = `INSERT INTO ${tableTitle} (${columns}) VALUES (${values})`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, (result: RunResult, error) => {
        if (error) {
          console.log("Insert error: " + error);
          reject(error);
        } else {
          resolve(result.lastID);
        }
      });
    });
  });
};

const update = (tableTitle: string, set: string, where: string) => {
  const sqlScript = `UPDATE ${tableTitle} SET ${set} WHERE ${where}`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, (runResult: RunResult, error) => {
        if (error) {
          console.log("Update error: " + error);
          reject(error);
        } else {
          resolve(runResult.lastID);
        }
      });
    });
  });
};

const remove = (tableTitle: string, where: string) => {
  const sqlScript = `DELETE ${tableTitle} WHERE ${where}`;
  console.log(sqlScript);

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, (error) => {
        if (error) {
          console.log("Delete error: " + error);
          reject(error);
        } else {
          resolve("Success");
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
