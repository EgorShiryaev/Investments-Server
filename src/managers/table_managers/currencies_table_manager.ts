import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import Currency from "../../models/currency";
import Column from "../models/column";

const TABLE_SETTINGS = DatabaseSettings["currenciesTable"];

const createCurrenciesTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const getCurrency = (id: string) => {
  const where = `id = ${id}`;
  return DatabaseManager.getAll(TABLE_SETTINGS.title, where);
};

const createCurrency = (currency: Currency) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `${currency.code}, ${currency.title}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createCurrenciesTableIfNotExists,
  getCurrency,
  createCurrency,
};
