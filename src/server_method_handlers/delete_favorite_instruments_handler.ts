import DeleteFavoriteInstrumentsParameters from '../interfaces/methods_parameters/delete_favorite_instruments_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import deleteFavoriteInstruments from '../usecases/delete_favorite_instrument';
import { logRequest } from '../utils/logger';
import { checkDeleteFavoriteInstrumentsParameters } from '../utils/request_parameters_checker';
import {
  sendErrorResponse,
  sendParameterNotFoundResponse,
  sendSuccessResponse,
} from '../utils/send_response_helper';

const deleteFavoriteInstrumentsHandler: ServerMethodHandler = (
  request,
  response
) => {
  logRequest(request);

  const params: DeleteFavoriteInstrumentsParameters = request.body;

  const errors = checkDeleteFavoriteInstrumentsParameters(params);

  if (errors) {
    sendParameterNotFoundResponse(response, errors);
    return;
  }

  deleteFavoriteInstruments(params)
    .then(() => {
      sendSuccessResponse(response);
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default deleteFavoriteInstrumentsHandler;
