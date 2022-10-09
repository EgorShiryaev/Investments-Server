import { USER_NOT_FOUND } from "../constants";
import { getUserInvestmentEntities } from "../functions";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { setHeaderContentType } from "../utils/response_convector";
import {
  sendGetSuccessResponse,
  sendServerErrorResponse,
  sendUserNotFoundResponse,
  sendUserUuidHeaderNotFoundResponse,
} from "../utils/send_response_helper";

const getUserInvestsHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  setHeaderContentType(response);

  if (userUuid === null) {
    sendUserUuidHeaderNotFoundResponse(response);
    return;
  }

  getUserInvestmentEntities(userUuid)
    .then((investments) => {
      sendGetSuccessResponse(response, { investments: investments });
    })
    .catch((error: Error) => {
      if (error.message === USER_NOT_FOUND) {
        sendUserNotFoundResponse(response);
      } else {
        sendServerErrorResponse(response, error);
      }
    });
};

export default getUserInvestsHandler;
