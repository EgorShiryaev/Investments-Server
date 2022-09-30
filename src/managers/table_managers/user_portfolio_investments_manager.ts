import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";
import UserPortfolioInvestment from "../../models/user_portfolio_investment";

const TABLE_SETTINGS = DatabaseSettings["userPortfolioInvestmentsTable"];

const createUserPortfolioInvestmentsTableIfNotExists = () => {
  const columnsInfo = TABLE_SETTINGS.columns
    .map((v) => `${v.columnTitle} ${v.type} ${v.limit && v.limit}`)
    .join(", ");
  const sqlScript = `CREATE TABLE IF NOT EXISTS ${TABLE_SETTINGS.title} (id INTEGER NOT NULL AUTO_INCREMENT, ${columnsInfo}, PRIMARY KEY (id))`;

  DatabaseManager.createTableIfNotExists(TABLE_SETTINGS.title, sqlScript);
};

const getAllUserPortfolioInvestments = (userUuid: string) => {
  const sqlScript = `SELECT * FROM ${TABLE_SETTINGS.title} WHERE userUuid = ${userUuid}`;

  return DatabaseManager.getAll(sqlScript);
};

const createUserPortfolioInvestment = (
  userPortfolioInvestment: UserPortfolioInvestment,
  userUuid: string,
  investmentId: string
) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle).join(", ");
  const sqlScript = `INSERT INTO ${TABLE_SETTINGS.title} (${columns}) VALUES (${userUuid}, ${investmentId}, ${userPortfolioInvestment.quantity} ${userPortfolioInvestment.averagePrice})`;

  return DatabaseManager.insert(sqlScript);
};

const updateUserPortfolioInvestment = (
  quantity: number,
  averagePrice: number,
  userUuid: string,
  investmentId: string
) => {
  const sqlScript = `UPDATE ${TABLE_SETTINGS.title} SET quantity = ${quantity}, averagePrice = ${averagePrice} WHERE userUuid = ${userUuid}, investmentId = ${investmentId}`;

  return DatabaseManager.update(sqlScript);
};

const deleteUserPortfolioInvestment = (
  userUuid: string,
  investmentId: string
) => {
  const sqlScript = `DELETE ${TABLE_SETTINGS.title} WHERE userUuid = ${userUuid}, investmentId = ${investmentId}`;
  
  return DatabaseManager.remove(sqlScript);
};

export default {
  createUserPortfolioInvestmentsTableIfNotExists,
  getAllUserPortfolioInvestments,
  createUserPortfolioInvestment,
  updateUserPortfolioInvestment,
  deleteUserPortfolioInvestment,
};
