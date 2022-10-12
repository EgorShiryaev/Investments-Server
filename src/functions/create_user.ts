import User from "../entities/user";
import usersTableManager from "../managers/users_table_manager";

const createUser = async (
  userUuid: string,
  name?: string,
  surname?: string
): Promise<User> => {
  await usersTableManager.add(userUuid, name, surname);

  return {
    uuid: userUuid,
    name: name ?? null,
    surname: surname ?? null,
  };
};

export default createUser;
