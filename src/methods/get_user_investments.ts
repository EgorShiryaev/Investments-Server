import {
  CurrenciesTableManager,
  InvestmentsTableManager,
  UserInvestmentsManager,
} from "../managers";
import Investment from "../models/investment";
import getUser from "./get_user";

const getUserInvestments = async (userUuid: string): Promise<Investment[]> => {
  const user = await getUser(userUuid);

  const sqlModels = await UserInvestmentsManager.getUserInvestments(
    `userId = ${user.id}`
  );

  const investments = await Promise.all(
    sqlModels.map(async (v) => {
      const invsetmentsModels = await InvestmentsTableManager.getInvestment(
        `id = ${v.investmentId}`
      );
      const invest = invsetmentsModels[0];
      const currencyModel = await CurrenciesTableManager.getCurrency(
        `id = ${invest.currencyId}`
      );
      return {
        ...invest,
        currency: currencyModel[0],
      };
    })
  );

  return investments.map((v) => ({
    ...v,
    id: undefined,
    currencyId: undefined,
    currency: {
      ...v.currency,
      id: undefined,
    },
  }));
};

export default getUserInvestments;
