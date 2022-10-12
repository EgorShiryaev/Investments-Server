import { USER_UUID_HEADER_NOT_FOUND } from "../constants/errors";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import {
  sendNotFoundResponse,
  sendParameterNotFoundResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../utils/send_response_helper";
import { getUserWithOutUuid } from "../utils/response_parser";
import createUser from "../usecases/create_user";
import { getUserRequestParametersError } from "../utils/check_request_parameters";

const postUserHandler: ServerMethodHandler = (request, response) => {
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

  createUser({ uuid: userUuid, name, surname })
    .then((user) => {
      sendSuccessResponse(response, { user: getUserWithOutUuid(user) });
    })
    .catch((error: Error) => {
      sendServerErrorResponse(response, error.message);
    });
};

export default postUserHandler;
