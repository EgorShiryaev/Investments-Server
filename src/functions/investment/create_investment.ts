import { InvestmentEntity } from "../../entities";
import { InvestmentsTableManager } from "../../managers";
import { InvestmentSqlModel } from "../../models";
import { createCurrencySqlModelIfNotExist } from "../currency/create_currency";
import { getInvestmentSqlModelWhereTicker } from "./get_investment";

export const createInvestmentSqlModel = async (
  investmentInfo: InvestmentEntity
): Promise<InvestmentSqlModel> => {
  const currency = await createCurrencySqlModelIfNotExist(
    investmentInfo.currency
  );

  await InvestmentsTableManager.create(investmentInfo, currency.id);

  const invest = await getInvestmentSqlModelWhereTicker(investmentInfo.ticker);
  return invest!;
};

export const createInvestSqlModelIfNotExist = async (
  investmentInfo: InvestmentEntity
): Promise<InvestmentSqlModel> => {
  const investment = await getInvestmentSqlModelWhereTicker(
    investmentInfo.ticker
  );

  return investment ?? (await createInvestmentSqlModel(investmentInfo));
};
