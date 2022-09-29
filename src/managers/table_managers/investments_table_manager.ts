import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";

const TABLE_SETTINGS = DatabaseSettings["investmentsTable"];

const createInvestmentsTableIfNotExists = () => {
  DatabaseManager.createTableIfNotExists(
    TABLE_SETTINGS.title,
    TABLE_SETTINGS.columns
  );
};

const getInvestment = (id: string) => {
  return DatabaseManager.getAll(TABLE_SETTINGS.title, `WHERE id = ${id}`);
};

const createInvestment = (
  prefix: string,
  title: string,
  currencyId: number
) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle);
  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, [
    prefix,
    title,
    currencyId,
  ]);
};

export default {
  createInvestmentsTableIfNotExists,
  getInvestment,
  createInvestment,
};
