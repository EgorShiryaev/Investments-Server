import usersTableManager from "../managers/users_table_manager";

const deleteUser = (uuid: string) => {
  return usersTableManager.remove(uuid);
};

export default deleteUser;
