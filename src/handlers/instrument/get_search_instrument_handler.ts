import ServerMethodHandler from '../../interfaces/server_method_handler'
import searchInstrument from '../../usecases/instrument/search_instrument'
import {
  getSearchInvestmentQueryParametersElseSendErrorResponse,
  sendErrorResponse,
  sendSuccessResponse
} from '../../utils/send_response_helper'

const getSearchInstrumentHandler: ServerMethodHandler = (request, response) => {
  const params = getSearchInvestmentQueryParametersElseSendErrorResponse(
    request,
    response
  )

  if (params === null) {
    return
  }

  searchInstrument(params.query)
    .then((list) => {
      sendSuccessResponse(response, list)
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error)
    })
}

export default getSearchInstrumentHandler
