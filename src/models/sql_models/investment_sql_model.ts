import SqlModel from "./sql_model";

type InvestmentSqlModel = {
    ticker: string;
    title: string;
    currencyId: number;
  } & SqlModel;

  export default InvestmentSqlModel