import { CurrencySqlModel } from "../managers/table_managers/currencies_table_manager";
import { InvestmentSqlModel } from "../managers/table_managers/investments_table_manager";
import InvestmentEntity from "../entities/investment_entity";
import CurrencyEntity from "../entities/currency_entity";
import UserEntity from "../entities/user_entity";
import { UserSqlModel } from "../managers/table_managers/users_table_manager";

const emptyIdAttribute = { id: undefined };

export const currencySqlModelToCurrencyEntity = (
  model: CurrencySqlModel
): CurrencyEntity => ({
  ...model,
  ...emptyIdAttribute,
});

export const userSqlModelToUserEntity = (model: UserSqlModel): UserEntity => ({
  ...model,
  ...emptyIdAttribute,
});

const emptyCurrencyIdAttribute = { currencyId: undefined };

export const investmentSqlModelToInvestEntity = (
  investmentSqlModel: InvestmentSqlModel,
  currency: CurrencyEntity
): InvestmentEntity => ({
  ...investmentSqlModel,
  currency: currency,
  ...emptyIdAttribute,
  ...emptyCurrencyIdAttribute,
});
