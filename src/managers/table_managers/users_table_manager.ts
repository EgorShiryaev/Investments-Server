import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";

const TABLE_SETTINGS = DatabaseSettings["usersTable"];

const createUsersTableIfNotExists = () => {
  const columnsInfo = TABLE_SETTINGS.columns
    .map((v) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");
  const sqlScript = `CREATE TABLE IF NOT EXISTS ${TABLE_SETTINGS.title} (${columnsInfo}, PRIMARY KEY (uuid))`;

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, sqlScript);
};

const getUser = (uuid: string) => {
  const sqlScript = `SELECT * FROM ${TABLE_SETTINGS.title} WHERE  uuid = ${uuid}`;
  return DatabaseManager.getAll(sqlScript);
};

const createUser = (uuid: string) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle).join(", ");
  const sqlScript = `INSERT INTO ${TABLE_SETTINGS.title} (${columns}) VALUES (${uuid})`;

  return DatabaseManager.insert(sqlScript);
};

export default {
  createUsersTableIfNotExists,
  getUser,
  createUser,
};
