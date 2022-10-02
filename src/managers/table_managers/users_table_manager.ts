import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import User from "../../models/user";
import Column from "../models/column";

export type UserSqlModel = User & SqlModel;

const TABLE_SETTINGS = DatabaseSettings["usersTable"];

const createUsersTableIfNotExists = () => {
  const columnsInfo = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columnsInfo);
};

const getUser = (uuid: string) => {
  const where = `uuid = ${uuid}`;

  return DatabaseManager.getAll<UserSqlModel>(TABLE_SETTINGS.title, where);
};

const createUser = (uuid: string) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = uuid;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createUsersTableIfNotExists,
  getUser,
  createUser,
};
