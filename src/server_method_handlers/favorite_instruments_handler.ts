import FavoriteInstrumentsParameters from '../interfaces/methods_parameters/favorite_intruments_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import getUserFavoriteIntruments from '../usecases/get_user_favorite_intruments';
import { checkFavoriteInstrumentsParameters } from '../utils/request_parameters_checker';
import {
  sendErrorResponse,
  sendParameterNotFoundResponse,
  sendSuccessResponse,
} from '../utils/send_response_helper';

const favoriteInstrumentsHandler: ServerMethodHandler = (request, response) => {
  console.log('===========================');
  console.log(request.method, request.path);
  console.log(request.body);

  const params = request.query as unknown as FavoriteInstrumentsParameters;

  const errors = checkFavoriteInstrumentsParameters(params);

  if (errors) {
    sendParameterNotFoundResponse(response, errors);
    return;
  }

  getUserFavoriteIntruments(params.userUuid)
    .then((value) => {
      sendSuccessResponse(response, value);
    })
    .catch((error) => {
      sendErrorResponse(response, error);
    });
};

export default favoriteInstrumentsHandler;
