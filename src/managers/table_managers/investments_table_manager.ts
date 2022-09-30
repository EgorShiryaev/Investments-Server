import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";
import Investment from "./../../models/investment";

const TABLE_SETTINGS = DatabaseSettings["investmentsTable"];

const createInvestmentsTableIfNotExists = () => {
  const columnsInfo = TABLE_SETTINGS.columns
    .map((v) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");
  const sqlScript = `CREATE TABLE IF NOT EXISTS ${TABLE_SETTINGS.title} (id INTEGER NOT NULL AUTO_INCREMENT, ${columnsInfo}, PRIMARY KEY (id))`;

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, sqlScript);
};

const getInvestment = (id: string) => {
  const sqlScript = `SELECT * FROM ${TABLE_SETTINGS.title} WHERE id = ${id}`;

  return DatabaseManager.getAll(sqlScript);
};

const createInvestment = (investment: Investment, currencyId: number) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle).join(", ");
  const sqlScript = `INSERT INTO ${TABLE_SETTINGS.title} (${columns}) VALUES (${investment.prefix}, ${investment.title}, ${currencyId})`;

  return DatabaseManager.insert(sqlScript);
};

export default {
  createInvestmentsTableIfNotExists,
  getInvestment,
  createInvestment,
};
