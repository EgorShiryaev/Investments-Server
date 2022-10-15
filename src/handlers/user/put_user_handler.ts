import ServerMethodHandler from '../../interfaces/server_method_handler'
import editUser from '../../usecases/user/edit_user'
import { getUserWithOutUuid } from '../../utils/response_parser'
import {
  getUserBodyParametersElseSendErrorResponse,
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse
} from '../../utils/send_response_helper'

const putUserHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response)
  if (userUuid === null) {
    return
  }

  const body = getUserBodyParametersElseSendErrorResponse(request, response)
  if (body === null) {
    return
  }

  const { name, surname } = body

  editUser({ uuid: userUuid, name, surname })
    .then((user) => {
      sendSuccessResponse(response, { user: getUserWithOutUuid(user) })
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error)
    })
}

export default putUserHandler
