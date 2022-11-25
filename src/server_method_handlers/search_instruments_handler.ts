import SearchInstrumnentsParameters from '../interfaces/methods_parameters/search_instrumnents_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import searchInstruments from '../usecases/instrument/search_instrument';
import { logRequest } from '../utils/logger';
import { checkSearchInstrumnentsParameters } from '../utils/request_parameters_checker';
import {
  sendErrorResponse,
  sendParameterNotFoundResponse,
  sendSuccessResponse,
} from '../utils/send_response_helper';

const searchInstrumentsHandler: ServerMethodHandler = (request, response) => {
  logRequest(request);

  const params = request.query as unknown as SearchInstrumnentsParameters;

  const errors = checkSearchInstrumnentsParameters(params);

  if (errors) {
    sendParameterNotFoundResponse(response, errors);
    return;
  }

  searchInstruments(params.query)
    .then((list) => {
      sendSuccessResponse(response, list);
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default searchInstrumentsHandler;
