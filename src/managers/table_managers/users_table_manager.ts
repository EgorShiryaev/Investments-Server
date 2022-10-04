import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import UserEntity from "../../entities/user_entity";
import Column from "../models/column";
import SqlModel from "../models/sql_model";

export type UserSqlModel = UserEntity & SqlModel;

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
