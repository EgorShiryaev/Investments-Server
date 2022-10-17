import GetPortfolioParameters from '../interfaces/methods_parameters/get_portfolio_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import getUserPortfolio from '../usecases/get_user_portfolio';
import { checkGetPortfolioParameters } from '../utils/request_parameters_checker';
import {
	sendErrorResponse,
	sendParameterNotFoundResponse,
	sendSuccessResponse,
} from '../utils/send_response_helper';

const getPortfolioHandler: ServerMethodHandler = (request, response) => {
	const params = request.query as unknown as GetPortfolioParameters;

	const errors = checkGetPortfolioParameters(params);

	if (errors) {
		sendParameterNotFoundResponse(response, errors);
		return;
	}

	getUserPortfolio(params.userUuid)
		.then((value) => {
			sendSuccessResponse(response, value);
		})
		.catch((error) => {
			sendErrorResponse(response, error);
		});
};

export default getPortfolioHandler;
