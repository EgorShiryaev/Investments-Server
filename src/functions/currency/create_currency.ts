import { CurrenciesTableManager } from "../../managers";
import { CurrencySqlModel } from "../../managers/table_managers/currencies_table_manager";
import CurrencyEntity from "../../entities/currency_entity";
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

  if (currency === null) {
    return await createCurrencySqlModel(currencyInfo);
  }
  return currency;
};
