import SearchParameters from '../interfaces/methods_parameters/search_parameters';
import ServerMethodHandler from '../interfaces/server_method_handler';
import searchInstrument from '../usecases/instrument/search_instrument';
import { checkSearchParameters } from '../utils/request_parameters_checker';
import {
	sendErrorResponse,
	sendParameterNotFoundResponse,
	sendSuccessResponse,
} from '../utils/send_response_helper';

const getSearchInstrumentHandler: ServerMethodHandler = (request, response) => {
	const { query } = request.query;
	const params: SearchParameters = { query: query as string };

	const errors = checkSearchParameters(params);

	if (errors) {
		sendParameterNotFoundResponse(response, errors);
		return;
	}

	searchInstrument(params.query)
		.then((list) => {
			sendSuccessResponse(response, list);
		})
		.catch((error: Error) => {
			sendErrorResponse(response, error);
		});
};

export default getSearchInstrumentHandler;
