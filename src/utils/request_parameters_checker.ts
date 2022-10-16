import RegistrationParameters from '../interfaces/registration_parameters';
import SearchParameters from '../interfaces/search_parameters';

const generateNotFoundParametersDescription = (array: (string | false)[]) => {
	return array
		.filter((v) => v !== false)
		.map((v) => `Parameter ${v} not found`);
};

export const checkRegistrationParameters = (params: RegistrationParameters) => {
	const fields = [!params.email && 'email', !params.password && 'password'];
	const errors = generateNotFoundParametersDescription(fields);
	return errors.length ? errors : null;
};

export const checkSearchParameters = (params: SearchParameters) => {
	const fields = [!params.query && 'query'];
	const errors = generateNotFoundParametersDescription(fields);
	return errors.length ? errors : null;
};
