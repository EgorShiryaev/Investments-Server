import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import Currency from "../../models/currency";
import Column from "../models/column";

export type CurrencySqlModel = Currency & SqlModel;

const TABLE_SETTINGS = DatabaseSettings["currenciesTable"];

const createCurrenciesTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const getCurrency = (code: string) => {
  const where = `code = "${code}"`;
  return DatabaseManager.getAll<CurrencySqlModel>(TABLE_SETTINGS.title, where);
};

const createCurrency = (currency: Currency) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `"${currency.code}", "${currency.title}"`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createCurrenciesTableIfNotExists,
  getCurrency,
  createCurrency,
};
