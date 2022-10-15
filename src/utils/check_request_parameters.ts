export const checkUserRequestBodyParametersIsNotExist = (
  name: string | null | undefined,
  surname: string | null | undefined
): boolean => {
  return name === undefined || surname === undefined
}

export const checkSearchInvestmentQueryParametersIsNotExist = (
  query: string | string[] | undefined
): boolean => {
  return query === undefined || query === ''
}
