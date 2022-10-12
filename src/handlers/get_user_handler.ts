import {
  USER_NOT_FOUND,
  USER_UUID_HEADER_NOT_FOUND,
} from "../constants/errors";
import getUser from "../functions/get_user";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import {
  sendNotFoundResponse,
  sendParameterNotFoundResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../utils/send_response_helper";

const getUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    sendParameterNotFoundResponse(response, USER_UUID_HEADER_NOT_FOUND);
    return;
  }

  getUser(userUuid)
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

export default getUserHandler;
