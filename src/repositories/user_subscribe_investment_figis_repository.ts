import investmentFigiNumberOfSubscriptionsRepository from './investment_figi_number_of_subscriptions_repository';

const userSubscribeInvestmentFigisRepository = new Map<string, string[]>();

const getUserInvestmentFigis = (userUuid: string) => {
  const userInvestmentFigis =
    userSubscribeInvestmentFigisRepository.get(userUuid);

  return userInvestmentFigis ?? [];
};

const addUserInvestmentFigi = (userUuid: string, figi: string) => {
  investmentFigiNumberOfSubscriptionsRepository.incrementSubscribtion(figi);

  const currentUserFigis = userSubscribeInvestmentFigisRepository.get(userUuid);

  if (currentUserFigis == null) {
    userSubscribeInvestmentFigisRepository.set(userUuid, [figi]);
    return;
  } else if (currentUserFigis.includes(figi)) {
    return;
  }
  const newUserFigis = [...currentUserFigis, figi];
  userSubscribeInvestmentFigisRepository.set(userUuid, newUserFigis);
};

const deleteUserInvestmentFigi = (userUuid: string, figi: string) => {
  const currentUserFigis = userSubscribeInvestmentFigisRepository.get(userUuid);

  if (currentUserFigis?.includes(figi)) {
    investmentFigiNumberOfSubscriptionsRepository.decrementSubscribtion(figi);
  }

  if (currentUserFigis != null) {
    const newUserFigis = [...currentUserFigis].filter((v) => v !== figi);

    userSubscribeInvestmentFigisRepository.set(userUuid, newUserFigis);
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
