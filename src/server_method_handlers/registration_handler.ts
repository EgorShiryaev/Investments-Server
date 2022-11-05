import RegistrationParameters from '../interfaces/methods_parameters/registration_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import registrationUser from '../usecases/registration_user';
import { checkRegistrationParameters } from '../utils/request_parameters_checker';
import {
  sendErrorResponse,
  sendParameterNotFoundResponse,
  sendSuccessResponse,
} from '../utils/send_response_helper';

const registrationHandler: ServerMethodHandler = (request, response) => {
  console.log('===========================');
  console.log(request.method, request.path);
  console.log(request.body);

  const params: RegistrationParameters = request.body;

  const errors = checkRegistrationParameters(params);

  if (errors) {
    sendParameterNotFoundResponse(response, errors);
    return;
  }

  registrationUser(params)
    .then((uuid) => {
      sendSuccessResponse(response, { userUuid: uuid });
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default registrationHandler;
