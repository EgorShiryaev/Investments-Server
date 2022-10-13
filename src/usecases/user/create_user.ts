import User from "../../entities/user";
import usersTableManager from "../../managers/users_table_manager";
import getUser from "./get_user";

const createUser = async (user: User): Promise<User> => {
  await usersTableManager.add(user);

  return getUser(user.uuid);
};

export default createUser;
