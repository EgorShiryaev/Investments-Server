import { USER_UUID_HEADER_NOT_FOUND } from "../constants/errors";
import {
  SERVER_ERROR_STATUS,
  SUCCESS_POST_WITH_CONTENT_STATUS,
  USER_UUID_HEADER_NOT_FOUND_STATUS,
} from "../constants/response_statuses";
import { createUserEntityIfNotExist } from "../functions/user/create_user";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { parseToJson, setHeaderContentType } from "../utils/response_convector";

const postUserHandler: ServerMethodHandler = async (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  setHeaderContentType(response);

  if (userUuid === null) {
    response
      .status(USER_UUID_HEADER_NOT_FOUND_STATUS)
      .send(parseToJson({ message: USER_UUID_HEADER_NOT_FOUND }));
    return;
  }

  createUserEntityIfNotExist(userUuid)
    .then(({ user, userAlreadyCreated }) => {
      response
        .status(SUCCESS_POST_WITH_CONTENT_STATUS)
        .send(parseToJson({ user, userAlreadyCreated }));
    })
    .catch((error: Error) => {
      response
        .status(SERVER_ERROR_STATUS)
        .send(parseToJson({ message: error.message }));
    });
};

export default postUserHandler;
