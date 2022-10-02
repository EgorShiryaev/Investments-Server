import User from "../models/user";
import UsersTableManager from "./../managers/table_managers/users_table_manager";

const getUser = async (uuid: string): Promise<User> => {
  const rows = await UsersTableManager.getUser(uuid);

  if (rows.length) {
    const user = rows[0];
    return user;
  }
  await UsersTableManager.createUser(uuid);
  return await getUser(uuid);
};

export default getUser;