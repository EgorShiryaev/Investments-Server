import ServerMethodHandler from '../../interfaces/server_method_handler'
import addInstrumentOnPortfolio from '../../usecases/portfolio/add_instrument_on_portfolio'
import {
  getPortfolioParametersElseSendErrorRequest,
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse
} from '../../utils/send_response_helper'

const postPortfolioHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response)

  if (userUuid === null) {
    return
  }

  const params = getPortfolioParametersElseSendErrorRequest(request, response)

  if (params === null) {
    return
  }

  addInstrumentOnPortfolio(userUuid, params.investmentFigi)
    .then(() => {
      sendSuccessResponse(response, { success: true })
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error)
    })
}

export default postPortfolioHandler
