import { InvestmentEntity } from "../entities";

export const checkAddUserInvestmentBodyParameteres = (
  investment?: InvestmentEntity
): string | undefined => {
  if (!investment) {
    return 'Body parameter "investment" not found';
  }
  const parametersNotFound = [];
  if (!investment.ticker) {
    parametersNotFound.push("investment.ticker");
  }
  if (!investment.figi) {
    parametersNotFound.push("investment.figi");
  }
  if (!investment.title) {
    parametersNotFound.push("investment.title");
  }
  if (!investment.currency) {
    parametersNotFound.push("investment.currency");
  } else {
    if (!investment.currency.code) {
      parametersNotFound.push("investment.currency.code");
    }
    if (!investment.currency.title) {
      parametersNotFound.push("investment.currency.title");
    }
  }

  if (parametersNotFound.length === 1) {
    return `Body parameter "${parametersNotFound[0]}" not found`;
  } else if (parametersNotFound.length > 1) {
    return `Body parameters ${parametersNotFound
      .map((v) => `"${v}"`)
      .join(", ")} not found`;
  }
};
