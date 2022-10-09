import { InvestmentsTableManager } from "../../managers";
import { InvestmentSqlModel } from "../../models";

const getInvestmentSqlModelWhere = async (
  where: string
): Promise<InvestmentSqlModel | null> => {
  const rows = await InvestmentsTableManager.get(where);

  return rows.length ? rows[0] : null;
};

export const getInvestmentSqlModelWhereId = (
  id: number
): Promise<InvestmentSqlModel | null> => {
  return getInvestmentSqlModelWhere(`id = ${id}`);
};

export const getInvestmentSqlModelWhereTicker = (
  ticker: string
): Promise<InvestmentSqlModel | null> => {
  return getInvestmentSqlModelWhere(`ticker = "${ticker}"`);
};
