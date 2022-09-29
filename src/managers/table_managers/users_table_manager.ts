import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";

const TABLE_SETTINGS = DatabaseSettings["usersTable"];

const createUsersTableIfNotExists = () => {
  DatabaseManager.createTableIfNotExists(
    TABLE_SETTINGS.title,
    TABLE_SETTINGS.columns
  );
};

const getUser = (uuid: string) => {
  return DatabaseManager.getAll(TABLE_SETTINGS.title, `WHERE uuid = ${uuid}`);
};

const createUser = (uuid: string) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle);
  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, [uuid]);
};

export default {
  createUsersTableIfNotExists, 
  getUser,
  createUser, 
}