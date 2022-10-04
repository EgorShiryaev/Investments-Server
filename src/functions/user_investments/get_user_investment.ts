import { getUserSqlModelWhereUuid } from "../user/get_user";
import { getInvestmentSqlModelWhereId } from "../investment/get_investment";
import { getCurrencyEntityWhereId } from "../currency/get_currency";
import InvestmentEntity from "../../entities/investment_entity";
import { USER_NOT_FOUND } from "../../constants/errors";
import { UserInvestmentsManager } from "../../managers";
import { investmentSqlModelToInvestEntity } from "../../utils/sql_model_convector";
import CurrencyEntity from "../../entities/currency_entity";

const getUserInvestmentEntities = async (
  userUuid: string
): Promise<InvestmentEntity[]> => {
  const user = await getUserSqlModelWhereUuid(userUuid);

  if (user === null) {
    throw Error(USER_NOT_FOUND);
  }

  const rows = await UserInvestmentsManager.get(`userId = ${user.id}`);

  const investmentSqlModelsOrNullArray = await Promise.all(
    rows.map(async (v) => await getInvestmentSqlModelWhereId(v.investmentId))
  );

  //@ts-ignore
  const investmentSqlModels: InvestmentSqlModel[] =
    investmentSqlModelsOrNullArray.filter((v) => v !== null);

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

export default getUserInvestmentEntities;
