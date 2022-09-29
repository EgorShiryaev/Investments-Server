import { route } from "express/lib/application";
import DATABASE from "../database";
import Column from "./models/column";

const createTableIfNotExists = (tableTitle: string, columns: Column[]) => {
  const columnsInfo = columns
    .map((v) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  const sqlScript = `CREATE TABLE IF NOT EXISTS ${tableTitle} (id INTEGER NOT NULL AUTO_INCREMENT, ${columnsInfo}, PRIMARY KEY (id))`;

  console.log(sqlScript);

  DATABASE.serialize(() => {
    DATABASE.run(sqlScript, () => {
      console.log(`Success create table ${tableTitle}`);
    });
  });
};

const getAll = (tableTitle: string, where?: string) => {
  const sqlScript = `SELECT * FROM ${tableTitle} ${where && `WHERE ${where}`}`;

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

const insert = (tableTitle: string, columnTitles: string[], values: any[]) => {
  const columns = columnTitles.map((v) => v).join(", ");
  const valuesPlaceholder = columnTitles.map(() => "?").join(", ");

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      const stmt = DATABASE.prepare(
        `INSERT INTO ${tableTitle} (${columns}) VALUES (${valuesPlaceholder})`,
        (error) => {
          if (error) {
            console.log("Insert error: " + error);
            reject(error);
          }
        }
      );
      stmt.run(values, (error) => {
        if (error) {
          console.log("Insert error: " + error);
          reject(error);
        } else {
          resolve("Success");
        }
      });
      stmt.finalize();
    });
  });
};

const update = (
  tableTitle: string,
  columnTitles: string[],
  values: any[],
  where: string
) => {
  const columns = columnTitles.map((v) => `${v} = ?`).join(", ");

  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      const stmt = DATABASE.prepare(
        `UPDATE ${tableTitle} SET ${columns} WHERE ${where}`,
        (error) => {
          if (error) {
            console.log("Update error: " + error);
            reject(error);
          }
        }
      );
      stmt.run(values, (error) => {
        if (error) {
          console.log("Update error", error);
          reject(error);
        } else {
          resolve("Success");
        }
      });
      stmt.finalize();
    });
  });
};

const remove = (tableTitle: string, where: string) => {
  return new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(`DELETE ${tableTitle} WHERE ${where}`, (error) => {
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
