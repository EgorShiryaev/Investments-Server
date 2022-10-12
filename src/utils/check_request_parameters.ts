import User from "../entities/user";

export const getUserRequestParametersError = (user: User) => {
  const fieldsNotFound = [
    user.name === undefined && "'name'",
    user.surname === undefined && "'surname'",
  ].filter((v) => v);

  if (fieldsNotFound.length === 1) {
    return `Parameter ${fieldsNotFound[0]} not found`;
  } else if (fieldsNotFound.length > 1) {
    return `Parameters ${fieldsNotFound.join(", ")} not found`;
  }
  return null;
};
