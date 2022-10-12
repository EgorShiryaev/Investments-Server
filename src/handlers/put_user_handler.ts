import {
  USER_NOT_FOUND,
  USER_UUID_HEADER_NOT_FOUND,
} from "../constants/errors";
import ServerMethodHandler from "../interfaces/server_method_handler";
import editUser from "../usecases/edit_user";
import { getUserRequestParametersError } from "../utils/check_request_parameters";
import { getUserUuidHeader } from "../utils/request_parser";
import {
  sendNotFoundResponse,
  sendParameterNotFoundResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../utils/send_response_helper";

const putUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    sendParameterNotFoundResponse(response, USER_UUID_HEADER_NOT_FOUND);
    return;
  }

  const errorDescription = getUserRequestParametersError(request.body);
  if (errorDescription !== null) {
    sendNotFoundResponse(response, errorDescription);
    return;
  }

  const { name, surname } = request.body;

  editUser({ uuid: userUuid, name, surname })
    .then((user) => {
      sendSuccessResponse(response, { user: user });
    })
    .catch((error: Error) => {
      if (error.message === USER_NOT_FOUND) {
        sendNotFoundResponse(response, error.message);
      } else {
        sendServerErrorResponse(response, error.message);
      }
    });
};

export default putUserHandler;
