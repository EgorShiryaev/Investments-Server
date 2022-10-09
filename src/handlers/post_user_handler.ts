import { createUserEntityIfNotExist } from "../functions";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { setHeaderContentType } from "../utils/response_convector";
import {
  sendPostSuccessResponse,
  sendServerErrorResponse,
  sendUserUuidHeaderNotFoundResponse,
} from "../utils/send_response_helper";

const postUserHandler: ServerMethodHandler = async (request, response) => {
  const userUuid = getUserUuidHeader(request.headers);

  setHeaderContentType(response);

  if (userUuid === null) {
    sendUserUuidHeaderNotFoundResponse(response);
    return;
  }

  createUserEntityIfNotExist(userUuid)
    .then(({ user, userAlreadyCreated }) => {
      sendPostSuccessResponse(response, {
        user: user,
        userAlreadyCreated: userAlreadyCreated,
      });
    })
    .catch((error: Error) => {
      sendServerErrorResponse(response, error);
    });
};

export default postUserHandler;
