import { USER_NOT_FOUND } from '../constants/errors';
import UserTableManager from '../managers/user_table_manager';

const checkUserIsExists = async (uuid: string) => {
  const user = await UserTableManager.getWhereUuid(uuid);

  if (user === undefined) {
    throw Error(USER_NOT_FOUND);
  }
};

export default checkUserIsExists;
