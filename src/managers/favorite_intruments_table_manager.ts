import databaseManager from './database_manager';
import { instrumentTableTitle } from './instrument_table_manager';
import { userTableTitle } from './user_table_manager';

interface FavoriteInstrumentsTableRecord {
  userUuid: string;
  instrumentFigi: string;
}

const tableTitle = 'FavoriteInstruments';

const createTableIfNotExists = async () => {
  const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
      userUuid TEXT NOT NULL, 
      instrumentFigi TEXT NOT NULL,
      PRIMARY KEY(userUuid, instrumentFigi),
      FOREIGN KEY (userUuid)
        REFERENCES ${userTableTitle} (uuid) 
          ON UPDATE CASCADE
          ON DELETE CASCADE,
      FOREIGN KEY (instrumentFigi)
        REFERENCES ${instrumentTableTitle} (figi) 
          ON UPDATE CASCADE
          ON DELETE CASCADE
    )`;

  return await databaseManager.runScript(script);
};

const add = async (userUuid: string, instrumentFigi: string) => {
  const script = `INSERT INTO ${tableTitle}
      (userUuid, instrumentFigi)
      VALUES ($userUuid, $instrumentFigi)`;

  const params = {
    $userUuid: userUuid,
    $instrumentFigi: instrumentFigi,
  };

  return await databaseManager.runScript(script, params);
};

const getAll = async (
  userUuid: string
): Promise<FavoriteInstrumentsTableRecord[]> => {
  const script = `SELECT * FROM ${tableTitle}
        WHERE userUuid = $userUuid`;

  const params = {
    $userUuid: userUuid,
  };

  return await databaseManager.readAll(script, params);
};

const get = async (userUuid: string, instrumentFigi: string) => {
  const script = `SELECT * FROM ${tableTitle}
      WHERE userUuid = $userUuid AND instrumentFigi = $instrumentFigi`;

  const params = {
    $userUuid: userUuid,
    $instrumentFigi: instrumentFigi,
  };

  return await databaseManager.readFirst<FavoriteInstrumentsTableRecord>(
    script,
    params
  );
};

const remove = async (userUuid: string, instrumentFigi: string) => {
  const script = `DELETE FROM ${tableTitle}
        WHERE userUuid = $userUuid AND instrumentFigi = $instrumentFigi`;

  const params = {
    $userUuid: userUuid,
    $instrumentFigi: instrumentFigi,
  };

  return await databaseManager.runScript(script, params);
};
const FavoriteInstrumentsTableManager = {
  createTableIfNotExists,
  add,
  get,
  getAll,
  remove,
};

export default FavoriteInstrumentsTableManager;
