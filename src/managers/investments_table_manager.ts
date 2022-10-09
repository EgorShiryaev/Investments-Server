import DatabaseSettings from "../../database_settings";
import { InvestmentEntity } from "../entities";
import { Column, InvestmentSqlModel } from "../models";
import DatabaseManager from "./database_manager";

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
  const values = `"${investment.ticker}", "${investment.figi}", "${investment.title}", ${currencyId}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

export default {
  createTableIfNotExists,
  get,
  create,
};
