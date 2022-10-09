import { CurrencyEntity, InvestmentEntity, UserEntity } from "../entities";
import { CurrencySqlModel, InvestmentSqlModel, UserSqlModel } from "../models";

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
