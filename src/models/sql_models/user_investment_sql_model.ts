import SqlModel from "./sql_model";

type UserInvestmentSqlModel = {
  investmentId: number;
  userId: number;
} & SqlModel;

export default UserInvestmentSqlModel;
