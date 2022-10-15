import ServerMethodHandler from '../../interfaces/server_method_handler'
import getPortfolio from '../../usecases/portfolio/get_portfolio'
import {
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse
} from '../../utils/send_response_helper'

const getPortfolioHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response)

  if (userUuid === null) {
    return
  }

  getPortfolio(userUuid)
    .then((values) => {
      sendSuccessResponse(response, { portfolio: values })
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error)
    })
}

export default getPortfolioHandler
