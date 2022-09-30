import { route } from "express/lib/application";
import { RunResult } from "sqlite3";
import DATABASE from "../database";
import Column from "./models/column";

const createTableIfNotExists = (tableTitle: string, sqlScript: string) => {
  console.log(sqlScript);

  DATABASE.serialize(() => {
    DATABASE.run(sqlScript, () => {
      console.log(`Success create table ${tableTitle}`);
    });
  });
};

const getAll = (sqlScript: string) => {
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

const insert = (sqlScript: string) => {
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

const update = (sqlScript: string) => {
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

const remove = (sqlScript: string) => {
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
