import { createServer } from "http";
import {
  USER_NOT_FOUND,
  USER_UUID_HEADER_NOT_FOUND,
} from "../constants/errors";
import createUser from "../functions/create_user";
import getUser from "../functions/get_user";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import {
  sendNotFoundResponse,
  sendParameterNotFoundResponse,
  sendServerErrorResponse,
  sendSuccessResponse,
} from "../utils/send_response_helper";

const postUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    sendParameterNotFoundResponse(response, USER_UUID_HEADER_NOT_FOUND);
    return;
  }

  const { name, surname } = request.body;

  createUser(userUuid, name, surname)
    .then((user) => {
      sendSuccessResponse(response, { user: user });
    })
    .catch((error: Error) => {
      sendServerErrorResponse(response, error.message);
    });
};

export default postUserHandler;
