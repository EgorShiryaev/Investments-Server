import { USER_NOT_FOUND } from "../../constants/errors";
import InvestmentEntity from "../../entities/investment_entity";
import { UserInvestmentsManager } from "../../managers";
import { createInvestSqlModelIfNotExist } from "../investment/create_investment";
import { getUserSqlModelWhereUuid } from "../user/get_user";
import getUserInvestmentEntities, {
  checkUserInvestIsExists,
} from "./get_user_investment";

const createUserInvestment = async (
  userUuid: string,
  investment: InvestmentEntity
): Promise<void> => {
  const userSqlModel = await getUserSqlModelWhereUuid(userUuid);

  if (userSqlModel === null) {
    throw Error(USER_NOT_FOUND);
  }

  if (!(await checkUserInvestIsExists(userUuid, investment.prefix))) {
    const investmentSqlModel = await createInvestSqlModelIfNotExist(investment);

    UserInvestmentsManager.create(userSqlModel.id, investmentSqlModel.id);
  }
};

export default createUserInvestment;
