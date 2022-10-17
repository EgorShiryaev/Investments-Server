import { v4 as generateUuid } from 'uuid';
import { USER_IS_EXISTS } from '../constants/errors';
import RegistrationParameters from '../interfaces/methods_parameters/registration_parameters';
import UserTableManager from '../managers/user_table_manager';

const registrationUser = async (params: RegistrationParameters) => {
  const { email, password } = params;

  const user = await UserTableManager.getWhereEmail(email);

  if (user !== undefined) {
    throw Error(USER_IS_EXISTS);
  }

  const uuid = generateUuid();

  await UserTableManager.add({
    uuid: uuid,
    email: email,
    password: password,
  });

  return uuid;
};

export default registrationUser;
