import AuthParameters from '../interfaces/methods_parameters/auth_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import authUser from '../usecases/auth_user';
import { logRequest } from '../utils/logger';
import { checkAuthParameters } from '../utils/request_parameters_checker';
import {
  sendErrorResponse,
  sendParameterNotFoundResponse,
  sendSuccessResponse,
} from '../utils/send_response_helper';

const authHandler: ServerMethodHandler = (request, response) => {
  logRequest(request);

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
