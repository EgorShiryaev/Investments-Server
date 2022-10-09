import { getUserEntityWhereUuid } from "../functions";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { setHeaderContentType } from "../utils/response_convector";
import {
  sendGetSuccessResponse,
  sendServerErrorResponse,
  sendUserNotFoundResponse,
  sendUserUuidHeaderNotFoundResponse,
} from "../utils/send_response_helper";

const getUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  setHeaderContentType(response);

  if (userUuid === null) {
    sendUserUuidHeaderNotFoundResponse(response);
    return;
  }

  getUserEntityWhereUuid(userUuid)
    .then((user) => {
      if (user === null) {
        sendUserNotFoundResponse(response);
      } else {
        sendGetSuccessResponse(response, { user: user });
      }
    })
    .catch((error: Error) => {
      sendServerErrorResponse(response, error);
    });
};

export default getUserHandler;
