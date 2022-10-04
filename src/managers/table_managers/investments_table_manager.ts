import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import InvestmentEntity from "../../entities/investment_entity";
import Column from "../models/column";
import SqlModel from "../models/sql_model";

export type InvestmentSqlModel = {
  prefix: string;
  title: string;
  currencyId: number;
} & SqlModel;

const TABLE_SETTINGS = DatabaseSettings["investmentsTable"];

const createTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const get = (where: string) => {
  return DatabaseManager.getAll<InvestmentSqlModel>(
    TABLE_SETTINGS.title,
    where
  );
};

const create = (investment: InvestmentEntity, currencyId: number) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `"${investment.prefix}", "${investment.title}", ${currencyId}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createTableIfNotExists,
  get,
  create,
};
