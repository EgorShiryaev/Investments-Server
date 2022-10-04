import InvestmentEntity from "../../entities/investment_entity";
import { InvestmentsTableManager } from "../../managers";
import { InvestmentSqlModel } from "../../managers/table_managers/investments_table_manager";

const getInvestmentSqlModelWhere = async (
  where: string
): Promise<InvestmentSqlModel | null> => {
  const rows = await InvestmentsTableManager.get(where);

  if (rows.length) {
    const investment = rows[0];
    return investment;
  }
  return null;
};

export const getInvestmentSqlModelWhereId = (
  id: number
): Promise<InvestmentSqlModel | null> => {
  return getInvestmentSqlModelWhere(`id = ${id}`);
};

export const getInvestmentSqlModelWherePrefix = (
  prefix: string
): Promise<InvestmentSqlModel | null> => {
  return getInvestmentSqlModelWhere(`prefix = "${prefix}"`);
};
