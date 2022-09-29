import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";

const TABLE_SETTINGS = DatabaseSettings["currenciesTable"];

const createCurrenciesTableIfNotExists = () => {
  DatabaseManager.createTableIfNotExists(
    TABLE_SETTINGS.title,
    TABLE_SETTINGS.columns
  );
};

const getCurrency = (id: string) => {
  return DatabaseManager.getAll(TABLE_SETTINGS.title, `WHERE id = ${id}`);
};

const createCurrency = (code: string, title: string) => {
  const columns = TABLE_SETTINGS.columns
    .map((v) => v.columnTitle)
  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, [code, title]);
};

export default {
  createCurrenciesTableIfNotExists,
  getCurrency,
  createCurrency,
};
