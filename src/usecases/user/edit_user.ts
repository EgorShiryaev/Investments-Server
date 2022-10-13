import User from "../../entities/user";
import usersTableManager from "../../managers/users_table_manager";
import getUser from "./get_user";

const editUser = async (user: User): Promise<User> => {
  await usersTableManager.edit(user);

  return getUser(user.uuid);
};

export default editUser;
