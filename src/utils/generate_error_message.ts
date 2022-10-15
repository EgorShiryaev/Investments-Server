export const generateUserBodyParametersErrorMessage = (
  name: string | null | undefined,
  surname: string | null | undefined
): string => {
  // @ts-expect-error
  const fieldsNotFound: string[] = [
    name === undefined && "'name'",
    surname === undefined && "'surname'"
  ].filter((v) => v)

  if (fieldsNotFound.length === 1) {
    return `Parameter ${fieldsNotFound[0]} not found`
  }
  return `Parameters ${fieldsNotFound.join(', ')} not found`
}
