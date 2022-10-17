import AuthParameters from '../interfaces/methods_parameters/auth_parameters';
import RegistrationParameters from '../interfaces/methods_parameters/registration_parameters';
import SearchParameters from '../interfaces/methods_parameters/search_parameters';
import GetPortfolioParameters from '../interfaces/methods_parameters/get_portfolio_parameters';

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

export const checkAuthParameters = (params: AuthParameters) => {
	const fields = [!params.email && 'email', !params.password && 'password'];
	const errors = generateNotFoundParametersDescription(fields);
	return errors.length ? errors : null;
};

export const checkGetPortfolioParameters = (params: GetPortfolioParameters) => {
	const fields = [!params.userUuid && 'userUuid'];
	const errors = generateNotFoundParametersDescription(fields);
	return errors.length ? errors : null;
};

export const checkSearchParameters = (params: SearchParameters) => {
	const fields = [!params.query && 'query'];
	const errors = generateNotFoundParametersDescription(fields);
	return errors.length ? errors : null;
};
