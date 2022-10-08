const userSubscribePrefixesRepository = new Map<string, string[]>();

const getAllPrefixes = (): string[] => {
  const allInvestmentsPrefixWithoutDuplicate = Array.from(
    new Set(userSubscribePrefixesRepository.values())
  ).flat();

  return allInvestmentsPrefixWithoutDuplicate;
};

const getUserPrefixes = (userUuid: string) => {
  const investmentsPrefix = userSubscribePrefixesRepository.get(userUuid);

  if (investmentsPrefix) {
    return investmentsPrefix;
  }
  return [];
};

const addUserPrefix = (userUuid: string, prefix: string) => {
  const currentUserInvestmentsPrefix =
    userSubscribePrefixesRepository.get(userUuid);

  if (!currentUserInvestmentsPrefix) {
    userSubscribePrefixesRepository.set(userUuid, [prefix]);
    return;
  }
  if (currentUserInvestmentsPrefix.includes(prefix)) {
    return;
  }
  userSubscribePrefixesRepository.set(userUuid, [
    ...currentUserInvestmentsPrefix,
    prefix,
  ]);
};

const deleteUserPrefix = (userUuid: string, prefix: string) => {
  const currentUserInvestmentsPrefix =
    userSubscribePrefixesRepository.get(userUuid);

  if (currentUserInvestmentsPrefix) {
    const newInvestmentsPrefix = [...currentUserInvestmentsPrefix].filter(
      (v) => v !== prefix
    );
    
    userSubscribePrefixesRepository.set(userUuid, newInvestmentsPrefix);
    return;
  }
};

const deleteAllUserPrefixes = (userUuid: string) => {
  userSubscribePrefixesRepository.delete(userUuid);
};

export default {
  getAllPrefixes,
  getUserPrefixes,
  addUserPrefix,
  deleteUserPrefix,
  deleteAllUserPrefixes,
};
