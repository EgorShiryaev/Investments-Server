import InvestmentEntity from "../../entities/investment_entity";
import { InvestmentsTableManager } from "../../managers";
import { InvestmentSqlModel } from "../../managers/table_managers/investments_table_manager";
import { createCurrencySqlModelIfNotExist } from "../currency/create_currency";
import { getInvestmentSqlModelWherePrefix } from "./get_investment";

export const createInvestmentSqlModel = async (
  investmentInfo: InvestmentEntity
): Promise<InvestmentSqlModel> => {
  const currency = await createCurrencySqlModelIfNotExist(
    investmentInfo.currency
  );

  await InvestmentsTableManager.create(investmentInfo, currency.id);

  const invest = await getInvestmentSqlModelWherePrefix(investmentInfo.prefix);
  return invest!;
};

export const createInvestSqlModelIfNotExist = async (
  investmentInfo: InvestmentEntity
): Promise<InvestmentSqlModel> => {
  const investment = await getInvestmentSqlModelWherePrefix(
    investmentInfo.prefix
  );

  if (investment === null) {
    return await createInvestmentSqlModel(investmentInfo);
  }
  return investment;
};
