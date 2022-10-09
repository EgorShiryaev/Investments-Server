import { USER_NOT_FOUND } from "../../constants";
import { InvestmentEntity } from "../../entities";
import { UserInvestmentsManager } from "../../managers";
import { investmentSqlModelToInvestEntity } from "../../utils/sql_model_convector";
import { getInvestmentSqlModelWhereId } from "../investment/get_investment";
import { getUserSqlModelWhereUuid } from "../user/get_user";


export const getUserInvestmentEntities = async (
  userUuid: string
): Promise<InvestmentEntity[]> => {
  const user = await getUserSqlModelWhereUuid(userUuid);

  if (user === null) {
    throw Error(USER_NOT_FOUND);
  }

  const rows = await UserInvestmentsManager.get(`userId = ${user.id}`);

  //@ts-ignore
  const investmentSqlModels: InvestmentSqlModel[] = (
    await Promise.all(
      rows.map(async (v) => await getInvestmentSqlModelWhereId(v.investmentId))
    )
  ).filter((v) => v !== null);

  const investments: InvestmentEntity[] = await Promise.all(
    investmentSqlModels.map(async (v) => {
      //@ts-ignore
      const currency: CurrencyEntity = await getCurrencyEntityWhereId(
        v.currencyId
      );

      return investmentSqlModelToInvestEntity(v, currency);
    })
  );

  return investments;
};

export const checkUserInvestIsExists = async (
  userUuid: string,
  investmentTicker: string
): Promise<boolean> => {
  const user = await getUserSqlModelWhereUuid(userUuid);

  if (user === null) {
    throw Error(USER_NOT_FOUND);
  }

  const rows = await UserInvestmentsManager.get(`userId = ${user.id}`);

  //@ts-ignore
  const investmentSqlModels: InvestmentSqlModel[] = await Promise.all(
    rows.map(async (v) => await getInvestmentSqlModelWhereId(v.investmentId))
  );

  const isExist = !!investmentSqlModels.filter(
    (v) => v.ticker === investmentTicker
  ).length;

  return isExist;
};

