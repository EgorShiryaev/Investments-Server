import { UserInvestmentsManager } from "../managers";
import Investment from "../models/investment";
import getCurrency from "./get_currency";
import getInvestment from "./get_investment";
import getUser from "./get_user";

const postUserInvestment = async (userUuid: string, investment: Investment) => {
  const user = await getUser(userUuid);

  const currency = await getCurrency(investment.currency);

  const currentInvestment = await getInvestment(investment, currency.id);

  return await UserInvestmentsManager.createUserPortfolioInvestment(
    user.id,
    currentInvestment.id
  );
};

export default postUserInvestment;
