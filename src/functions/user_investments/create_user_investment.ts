import { USER_NOT_FOUND } from "../../constants";
import { InvestmentEntity } from "../../entities";
import { UserInvestmentsManager } from "../../managers";
import { createInvestSqlModelIfNotExist } from "../investment/create_investment";
import { getUserSqlModelWhereUuid } from "../user/get_user";
import { checkUserInvestIsExists } from "./get_user_investment";

const createUserInvestment = async (
  userUuid: string,
  investment: InvestmentEntity
): Promise<void> => {
  const userSqlModel = await getUserSqlModelWhereUuid(userUuid);

  if (userSqlModel === null) {
    throw Error(USER_NOT_FOUND);
  }

  if (!(await checkUserInvestIsExists(userUuid, investment.ticker))) {
    const investmentSqlModel = await createInvestSqlModelIfNotExist(investment);

    UserInvestmentsManager.create(userSqlModel.id, investmentSqlModel.id);
  }
};

export default createUserInvestment;
