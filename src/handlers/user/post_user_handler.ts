import ServerMethodHandler from "../../interfaces/server_method_handler";
import {
  getUserBodyParametersElseSendErrorResponse,
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/send_response_helper";
import { getUserWithOutUuid } from "../../utils/response_parser";
import createUser from "../../usecases/user/create_user";

const postUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response);
  if (userUuid === null) {
    return;
  }

  const body = getUserBodyParametersElseSendErrorResponse(request, response);
  if (body === null) {
    return;
  }

  const { name, surname } = body;

  createUser({ uuid: userUuid, name: name, surname: surname })
    .then((user) => {
      sendSuccessResponse(response, getUserWithOutUuid(user));
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default postUserHandler;
