import DATABASE from '../database';

const runScript = async (sqlScript: string, params?: object) => {
  return await new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.run(sqlScript, params, function (error) {
        if (error !== null) {
          reject(error);
          return;
        }
        resolve({});
      });
    });
  });
};

const readFirst = async <T>(
  sqlScript: string,
  params?: object
): Promise<T | undefined> => {
  return await new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.get(sqlScript, params, (error, row) => {
        if (error !== null) {
          reject(error);
          return;
        }
        return resolve(row);
      });
    });
  });
};

const readAll = async <T>(sqlScript: string, params?: object): Promise<T[]> => {
  return await new Promise((resolve, reject) => {
    DATABASE.serialize(() => {
      DATABASE.all(sqlScript, params, (error, rows) => {
        if (error !== null) {
          reject(error);
          return;
        }
        return resolve(rows);
      });
    });
  });
};

const databaseManager = {
  runScript,
  readFirst,
  readAll,
};

export default databaseManager;
