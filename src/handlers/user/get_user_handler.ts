import getUser from '../../usecases/user/get_user'
import ServerMethodHandler from '../../interfaces/server_method_handler'
import { getUserWithOutUuid } from '../../utils/response_parser'
import {
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse
} from '../../utils/send_response_helper'

const getUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response)

  if (userUuid === null) {
    return
  }

  getUser(userUuid)
    .then((user) => {
      sendSuccessResponse(response, { user: getUserWithOutUuid(user) })
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error)
    })
}

export default getUserHandler
