import User from "../entities/user";

export const getUserWithOutUuid = (user: User) => ({
  ...user,
  uuid: undefined,
});
