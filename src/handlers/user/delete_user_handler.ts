import ServerMethodHandler from "../../interfaces/server_method_handler";
import deleteUser from "../../usecases/user/delete_user";
import {
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/send_response_helper";

const deleteUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response);

  if (userUuid === null) {
    return;
  }

  deleteUser(userUuid)
    .then(() => {
      sendSuccessResponse(response, {
        success: true,
      });
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default deleteUserHandler;
