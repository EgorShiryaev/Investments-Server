import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import Investment from "./../../models/investment";
import Column from "../models/column";

export type InvestmentSqlModel = {
  prefix: string;
  title: string;
  currencyId: number;
} & SqlModel;

const TABLE_SETTINGS = DatabaseSettings["investmentsTable"];

const createInvestmentsTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const getInvestment = (where: string) => {
  return DatabaseManager.getAll<InvestmentSqlModel>(
    TABLE_SETTINGS.title,
    where
  );
};

const createInvestment = (investment: Investment, currencyId: number) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `"${investment.prefix}", "${investment.title}", ${currencyId}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createInvestmentsTableIfNotExists,
  getInvestment,
  createInvestment,
};
