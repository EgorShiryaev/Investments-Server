import { CurrenciesTableManager } from "../managers";
import { CurrencySqlModel } from "../managers/table_managers/currencies_table_manager";
import Currency from "../models/currency";

const getCurrency = async (currency: Currency): Promise<CurrencySqlModel> => {
  const rows = await CurrenciesTableManager.getCurrency(currency.code);

  if (rows.length) {
    const currency = rows[0];
    return currency;
  }
  await CurrenciesTableManager.createCurrency(currency);
  return await getCurrency(currency);
};

export default getCurrency;
