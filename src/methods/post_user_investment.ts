import { UserInvestmentsManager } from "../managers";
import Investment from "../models/investment";
import getCurrency from "./get_currency";
import getInvestment from "./get_investment";
import getUser from "./get_user";

const postUserInvestment = async (userUuid: string, investment: Investment) => {
  const user = await getUser(userUuid);

  const currency = await getCurrency(investment.currency);

  const currentInvestment = await getInvestment(investment, currency.id);

  const userInvestments = await UserInvestmentsManager.getUserInvestments(
    `userId = ${user.id}`
  );

  if (userInvestments.length) {
    let isExist = false;
    userInvestments.forEach((v) => {
      if (v.investmentId === currentInvestment.id) {
        isExist = true;
      }
    });

    if (!isExist) {
      return await createUserPortfolioInvestment(user.id, currentInvestment.id);
    } else {
      return {
        success: false,
        message: "Invest is exists",
      };
    }
  } else {
    return await createUserPortfolioInvestment(user.id, currentInvestment.id);
  }
};

const createUserPortfolioInvestment = async (
  userId: number,
  investId: number
) => {
  return await UserInvestmentsManager.createUserPortfolioInvestment(
    userId,
    investId
  );
};

export default postUserInvestment;
