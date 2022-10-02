import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import Column from "../models/column";

export interface UserInvestmentSqlModel {
  id: number;
  investmentId: number;
  userId: number;
}

const TABLE_SETTINGS = DatabaseSettings["userInvestmentsTable"];

const createUserPortfolioInvestmentsTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const getUserInvestments = (where: string) => {

  return DatabaseManager.getAll<UserInvestmentSqlModel>(
    TABLE_SETTINGS.title,
    where
  );
};

const createUserPortfolioInvestment = (
  userId: number,
  investmentId: number
) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `${userId}, ${investmentId}`;

  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, values);
};

const deleteUserPortfolioInvestment = (
  userId: string,
  investmentId: string
) => {
  const where = `userId = ${userId}, investmentId = ${investmentId}`;

  return DatabaseManager.remove(TABLE_SETTINGS.title, where);
};

export default {
  createUserPortfolioInvestmentsTableIfNotExists,
  getUserInvestments,
  createUserPortfolioInvestment,
  deleteUserPortfolioInvestment,
};
