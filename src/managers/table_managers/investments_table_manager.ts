import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";
import Investment from "./../../models/investment";

const TABLE_SETTINGS = DatabaseSettings["investmentsTable"];

const createInvestmentsTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const getInvestment = (id: string) => {
  const where = `id = ${id}`;
  return DatabaseManager.getAll(TABLE_SETTINGS.title, where);
};

const createInvestment = (investment: Investment, currencyId: number) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle).join(", ");
  const values = `${investment.prefix}, ${investment.title}, ${currencyId}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createInvestmentsTableIfNotExists,
  getInvestment,
  createInvestment,
};
