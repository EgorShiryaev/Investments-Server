import { InvestmentsTableManager } from "../managers";
import { InvestmentSqlModel } from "../managers/table_managers/investments_table_manager";
import Investment from "../models/investment";

const getInvestment = async (
  investment: Investment,
  currencyId: number
): Promise<InvestmentSqlModel> => {
  const rows = await InvestmentsTableManager.getInvestment(investment.prefix);

  if (rows.length) {
    const investment = rows[0];
    return investment;
  }
  await InvestmentsTableManager.createInvestment(investment, currencyId);
  return await getInvestment(investment, currencyId);
};

export default getInvestment;
