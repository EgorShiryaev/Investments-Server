import DatabaseSettings from "../../database_settings";
import { Column, UserSqlModel, } from "../models";
import DatabaseManager from "./database_manager";

const TABLE_SETTINGS = DatabaseSettings["usersTable"];

const createTableIfNotExists = () => {
  const columnsInfo = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columnsInfo);
};

const get = (where: string) => {
  return DatabaseManager.getAll<UserSqlModel>(TABLE_SETTINGS.title, where);
};

const create = (uuid: string) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = uuid;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createTableIfNotExists,
  get,
  create,
};
