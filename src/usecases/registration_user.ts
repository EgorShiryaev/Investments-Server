import { v4 as generateUuid } from 'uuid';
import RegistrationParameters from '../interfaces/registration_parameters';
import UserTableManager from '../managers/user_table_manager';

const registrationUser = async (params: RegistrationParameters) => {
	const uuid = generateUuid();

	await UserTableManager.add({
		uuid: uuid,
		email: params.email,
		password: params.password,
	});

	return uuid;
};

export default registrationUser;
