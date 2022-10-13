import { USER_NOT_FOUND } from "../../constants/errors";
import usersTableManager from "../../managers/users_table_manager";

const deleteUser = async (uuid: string) => {
  const result = await usersTableManager.remove(uuid);

  if (result.rowsChanged === 0){
    throw Error(USER_NOT_FOUND)
  }

  return result;
};

export default deleteUser;
