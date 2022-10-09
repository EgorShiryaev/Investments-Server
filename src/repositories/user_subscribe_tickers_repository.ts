const userSubscribeTickersRepository = new Map<string, string[]>();

const getAllTickers = (): string[] => {
  const allUsersTickersWithoutDuplicate = Array.from(
    new Set(userSubscribeTickersRepository.values())
  ).flat();

  return allUsersTickersWithoutDuplicate;
};

const getUserTickers = (userUuid: string) => {
  const investmentsTickers = userSubscribeTickersRepository.get(userUuid);

  return investmentsTickers ?? [];
};

const addUserTicker = (userUuid: string, ticker: string) => {
  const currentUserTickers = userSubscribeTickersRepository.get(userUuid);

  if (!currentUserTickers) {
    userSubscribeTickersRepository.set(userUuid, [ticker]);
    return;
  } else if (currentUserTickers.includes(ticker)) {
    return;
  }
  const newUserTickers = [...currentUserTickers, ticker];
  userSubscribeTickersRepository.set(userUuid, newUserTickers);
};

const deleteUserTicker = (userUuid: string, ticker: string) => {
  const currentUserTickers = userSubscribeTickersRepository.get(userUuid);

  if (currentUserTickers) {
    const newUserTickers = [...currentUserTickers].filter((v) => v !== ticker);

    userSubscribeTickersRepository.set(userUuid, newUserTickers);
    return;
  }
};

const deleteAllUserTickers = (userUuid: string) => {
  userSubscribeTickersRepository.delete(userUuid);
};

export default {
  getAllTickers,
  getUserTickers,
  addUserTicker,
  deleteUserTicker,
  deleteAllUserTickers,
};
