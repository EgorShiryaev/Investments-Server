import CurrencyEntity from "../../entities/currency_entity";
import { CurrenciesTableManager } from "../../managers";
import { CurrencySqlModel } from "../../managers/table_managers/currencies_table_manager";
import { currencySqlModelToCurrencyEntity } from "../../utils/sql_model_convector";

const getCurrencySqlModelWhere = async (
  where: string
): Promise<CurrencySqlModel | null> => {
  const rows = await CurrenciesTableManager.get(where);

  if (rows.length) {
    const currency = rows[0];
    return currency;
  }
  return null;
};

export const getCurrencySqlModelWhereId = (
  id: number
): Promise<CurrencySqlModel | null> => {
  return getCurrencySqlModelWhere(`id = ${id}`);
};

export const getCurrencySqlModelWhereCode = (
  code: string
): Promise<CurrencySqlModel | null> => {
  return getCurrencySqlModelWhere(`code = "${code}"`);
};


export const getCurrencyEntityWhereId = async (
  id: number
): Promise<CurrencyEntity | null> => {
  const model = await getCurrencySqlModelWhereId(id);
  return model && currencySqlModelToCurrencyEntity(model);
};

export const getCurrencyEntityWhereCode = async (
  code: string
): Promise<CurrencyEntity | null> => {
  const model = await getCurrencySqlModelWhereCode(code);
  return model && currencySqlModelToCurrencyEntity(model);
};