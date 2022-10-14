export const checkUserRequestBodyParametersIsNotExist = (
  name: string | null | undefined,
  surname: string | null | undefined
) => {
  return name === undefined || surname === undefined;
};

export const checkSearchInvestmentQueryParametersIsNotExist = (
  query: string | string[] | undefined
) => {
  return query === undefined || query === "";
};
