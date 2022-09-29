import DatabaseManager from "../database_manager";
import DatabaseSettings from "../../../settings/database_settings";

const TABLE_SETTINGS = DatabaseSettings["userPortfolioInvestmentsTable"];

const createUserPortfolioInvestmentsTableIfNotExists = () => {
  DatabaseManager.createTableIfNotExists(
    TABLE_SETTINGS.title,
    TABLE_SETTINGS.columns
  );
};

const getAllUserPortfolioInvestments = (userUuid: string) => {
  return DatabaseManager.getAll(
    TABLE_SETTINGS.title,
    `WHERE userUuid = ${userUuid}`
  );
};

const createUserPortfolioInvestment = (
  userUuid: string,
  investmentId: number,
  quantity: number,
  averagePrice: number
) => {
  const columns = TABLE_SETTINGS.columns.map((v) => v.columnTitle);
  return DatabaseManager.insert(TABLE_SETTINGS.title, columns, [
    userUuid,
    investmentId,
    quantity,
    averagePrice,
  ]);
};

const updateUserPortfolioInvestment = (
  columnTitles: string[],
  values: string[],
  userUuid: string,
  investmentId: string
) => {
  return DatabaseManager.update(
    TABLE_SETTINGS.title,
    columnTitles,
    values,
    `userUuid = ${userUuid}, investmentId = ${investmentId}`
  );
};

const deleteUserPortfolioInvestment = (
  userUuid: string,
  investmentId: string
) => {
  return DatabaseManager.remove(
    TABLE_SETTINGS.title,
    `userUuid = ${userUuid}, investmentId = ${investmentId}`
  );
};

export default {
  createUserPortfolioInvestmentsTableIfNotExists,
  getAllUserPortfolioInvestments,
  createUserPortfolioInvestment,
  updateUserPortfolioInvestment,
  deleteUserPortfolioInvestment,
};
