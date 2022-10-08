import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import Column from "../../models/column";
import SqlModel from "../../models/sql_model";

export type UserInvestmentSqlModel = {
  investmentId: number;
  userId: number;
} & SqlModel;

const TABLE_SETTINGS = DatabaseSettings["userInvestmentsTable"];

const createTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const get = (where: string) => {
  return DatabaseManager.getAll<UserInvestmentSqlModel>(
    TABLE_SETTINGS.title,
    where
  );
};

const create = (userId: number, investmentId: number) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `${userId}, ${investmentId}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

const remove = (userId: string, investmentId: string) => {
  const where = `userId = ${userId}, investmentId = ${investmentId}`;

  return DatabaseManager.remove(TABLE_SETTINGS.title, where);
};

export default {
  createTableIfNotExists,
  get,
  create,
  remove,
};
