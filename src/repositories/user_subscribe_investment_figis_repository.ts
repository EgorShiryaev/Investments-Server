import FigiNumberOfSubscriptionsRepository from "./figi_number_of_subscriptions_repository";

const userSubscribeInvestmentFigisRepository = new Map<string, string[]>();

const getUserInvestmentFigis = (userUuid: string) => {
  const investmentsTickers =
    userSubscribeInvestmentFigisRepository.get(userUuid);

  return investmentsTickers ?? [];
};

const addUserInvestmentFigi = (userUuid: string, figi: string) => {
  FigiNumberOfSubscriptionsRepository.incrementSubscribtion(figi);

  const currentUserTickers =
    userSubscribeInvestmentFigisRepository.get(userUuid);

  if (!currentUserTickers) {
    userSubscribeInvestmentFigisRepository.set(userUuid, [figi]);
    return;
  } else if (currentUserTickers.includes(figi)) {
    return;
  }
  const newUserTickers = [...currentUserTickers, figi];
  userSubscribeInvestmentFigisRepository.set(userUuid, newUserTickers);
};

const deleteUserInvestmentFigi = (userUuid: string, figi: string) => {
  FigiNumberOfSubscriptionsRepository.decrementSubscribtion(figi);
  const currentUserTickers =
    userSubscribeInvestmentFigisRepository.get(userUuid);

  if (currentUserTickers) {
    const newUserTickers = [...currentUserTickers].filter((v) => v !== figi);

    userSubscribeInvestmentFigisRepository.set(userUuid, newUserTickers);
    return;
  }
};

const deleteAllUserInvestmentFigis = (userUuid: string) => {
  userSubscribeInvestmentFigisRepository.delete(userUuid);
};

export default {
  getUserInvestmentFigis,
  addUserInvestmentFigi,
  deleteUserInvestmentFigi,
  deleteAllUserInvestmentFigis,
};
