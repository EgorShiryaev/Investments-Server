import AuthParameters from '../interfaces/auth_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import authUser from '../usecases/auth_user';
import { checkAuthParameters } from '../utils/request_parameters_checker';
import {
	sendErrorResponse,
	sendParameterNotFoundResponse,
	sendSuccessResponse,
} from '../utils/send_response_helper';

const authHandler: ServerMethodHandler = (request, response) => {
	const params: AuthParameters = request.body;

	const errors = checkAuthParameters(params);

	if (errors) {
		sendParameterNotFoundResponse(response, errors);
		return;
	}

	authUser(params)
		.then((uuid) => {
			sendSuccessResponse(response, { userUuid: uuid });
		})
		.catch((error: Error) => {
			sendErrorResponse(response, error);
		});
};

export default authHandler;
