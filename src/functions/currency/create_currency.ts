import { CurrencyEntity } from "../../entities";
import { CurrenciesTableManager } from "../../managers";
import { CurrencySqlModel } from "../../models";
import { getCurrencySqlModelWhereCode } from "./get_currency";

export const createCurrencySqlModel = async (
  currencyInfo: CurrencyEntity
): Promise<CurrencySqlModel> => {
  await CurrenciesTableManager.create(currencyInfo);

  const currency = await getCurrencySqlModelWhereCode(currencyInfo.code);
  return currency!;
};

export const createCurrencySqlModelIfNotExist = async (
  currencyInfo: CurrencyEntity
): Promise<CurrencySqlModel> => {
  const currency = await getCurrencySqlModelWhereCode(currencyInfo.code);

  return currency ?? (await createCurrencySqlModel(currencyInfo));
};
