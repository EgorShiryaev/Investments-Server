import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import CurrencyEntity from "../../entities/currency_entity";
import Column from "../models/column";
import SqlModel from "../models/sql_model";

export type CurrencySqlModel = CurrencyEntity & SqlModel;

const TABLE_SETTINGS = DatabaseSettings["currenciesTable"];

const createTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const get = (where: string) => {
  return DatabaseManager.getAll<CurrencySqlModel>(TABLE_SETTINGS.title, where);
};

const create = (currency: CurrencyEntity) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `"${currency.code}", "${currency.title}"`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createTableIfNotExists,
  get,
  create,
};
