import {
  USER_NOT_FOUND,
  USER_UUID_HEADER_NOT_FOUND,
} from "../constants/errors";
import ServerMethodHandler from "../interfaces/server_method_handler";
import deleteUser from "../usecases/delete_user";
import { getUserUuidHeader } from "../utils/request_parser";
import {
  sendNotFoundResponse,
  sendParameterNotFoundResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../utils/send_response_helper";

const deleteUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    sendParameterNotFoundResponse(response, USER_UUID_HEADER_NOT_FOUND);
    return;
  }

  deleteUser(userUuid)
    .then(() => {
      sendSuccessResponse(response, {});
    })
    .catch((error: Error) => {
      if (error.message === USER_NOT_FOUND) {
        sendNotFoundResponse(response, error.message);
      } else {
        sendServerErrorResponse(response, error.message);
      }
    });
};

export default deleteUserHandler;
