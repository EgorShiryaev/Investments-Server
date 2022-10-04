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
import { getUserEntityWhereUuid } from "../functions/user/get_user";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { parseToJson } from "../utils/response_convector";

const getUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    response
      .status(USER_UUID_HEADER_NOT_FOUND_STATUS)
      .send(parseToJson({ message: USER_UUID_HEADER_NOT_FOUND }));
    return;
  }

  getUserEntityWhereUuid(userUuid)
    .then((user) => {
      if (user === null) {
        response
          .status(USER_NOT_FOUND_STATUS)
          .send(parseToJson({ message: USER_NOT_FOUND }));
      } else {
        response.status(SUCCESS_GET_STATUS).send(parseToJson({ user: user }));
      }
    })
    .catch((error: Error) => {
      response
        .status(SERVER_ERROR_STATUS)
        .send(parseToJson({ message: error.message }));
    });
};

export default getUserHandler;
