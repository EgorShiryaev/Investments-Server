import {
  USER_NOT_FOUND,
  USER_UUID_HEADER_NOT_FOUND,
} from "../constants/errors";
import {
  SERVER_ERROR_STATUS,
  SUCCESS_GET_STATUS,
  USER_NOT_FOUND_STATUS,
  USER_UUID_HEADER_NOT_FOUND_STATUS,
} from "../constants/response_statuses";
import getUserInvestmentEntities from "../functions/user_investments/get_user_investment";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { parseToJson } from "../utils/response_convector";

const getUserInvestsHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    response
      .status(USER_UUID_HEADER_NOT_FOUND_STATUS)
      .send(parseToJson({ message: USER_UUID_HEADER_NOT_FOUND }));
    return;
  }

  getUserInvestmentEntities(userUuid)
    .then((investments) => {
      response
        .status(SUCCESS_GET_STATUS)
        .send(parseToJson({ investments: investments }));
    })
    .catch((error: Error) => {
      if (error.message === USER_NOT_FOUND) {
        response.status(USER_NOT_FOUND_STATUS);
      } else {
        response.status(SERVER_ERROR_STATUS);
      }
      response.send(parseToJson({ message: error.message }));
    });
};

export default getUserInvestsHandler;
