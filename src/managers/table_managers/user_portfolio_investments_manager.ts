import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../database_settings";
import Column from "../models/column";

const TABLE_SETTINGS = DatabaseSettings["userPortfolioInvestmentsTable"];

const createUserPortfolioInvestmentsTableIfNotExists = () => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, columns);
};

const getAllUserPortfolioInvestments = (userId: string) => {
  const where = `userId = ${userId}`;

  return DatabaseManager.getAll(TABLE_SETTINGS.title, where);
};

const createUserPortfolioInvestment = (
  userUuid: string,
  investmentId: string
) => {
  const columns = TABLE_SETTINGS.columns
    .map((v: Column) => v.columnTitle)
    .join(", ");
  const values = `${userUuid}, ${investmentId}`;

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
  getAllUserPortfolioInvestments,
  createUserPortfolioInvestment,
  deleteUserPortfolioInvestment,
};
