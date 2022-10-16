import ServerMethodHandler from '../../interfaces/server_method_handler'
import deleteInstrumentOnPortfolio from '../../usecases/portfolio/delete_instrument_on_portfolio'
import {
  getPortfolioParametersElseSendErrorRequest,
  getUserUuidElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse
} from '../../utils/send_response_helper'

const deletePortfolioHandler: ServerMethodHandler = (request, response) => {
  const userUuid = getUserUuidElseSendErrorResponse(request, response)

  if (userUuid === null) {
    return
  }

  const params = getPortfolioParametersElseSendErrorRequest(request, response)

  if (params === null) {
    return
  }

  deleteInstrumentOnPortfolio(userUuid, params.investmentFigi)
    .then((result) => {
      sendSuccessResponse(response, { success: true })
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error)
    })
}

export default deletePortfolioHandler
