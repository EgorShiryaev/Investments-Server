import AddFavoriteInstrumentsParameters from '../interfaces/methods_parameters/add_favorite_instruments_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import addToFavoriteInstruments from '../usecases/add_to_favorite_instruments';
import { checkDeleteFavoriteInstrumentsParameters } from '../utils/request_parameters_checker';
import {
  sendErrorResponse,
  sendParameterNotFoundResponse,
  sendSuccessResponse,
} from '../utils/send_response_helper';

const addFavoriteInstrumentsHandler: ServerMethodHandler = (
  request,
  response
) => {
  console.log('===========================');
  console.log(request.method, request.path);
  console.log(request.body);

  const params: AddFavoriteInstrumentsParameters = request.body;

  const errors = checkDeleteFavoriteInstrumentsParameters(params);

  if (errors) {
    sendParameterNotFoundResponse(response, errors);
    return;
  }

  addToFavoriteInstruments(params)
    .then(() => {
      sendSuccessResponse(response);
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default addFavoriteInstrumentsHandler;
