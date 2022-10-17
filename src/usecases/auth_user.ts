import { USER_NOT_FOUND } from '../constants/errors';
import AuthParameters from '../interfaces/methods_parameters/auth_parameters';
import UserTableManager from '../managers/user_table_manager';

const authUser = async (params: AuthParameters) => {
  const { email, password } = params;

  const user = await UserTableManager.getWhereEmailWithPassword(
    email,
    password
  );

  if (user === undefined) {
    throw Error(USER_NOT_FOUND);
  }

  return user.uuid;
};

export default authUser;
