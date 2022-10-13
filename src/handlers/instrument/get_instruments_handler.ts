import ServerMethodHandler from "../../interfaces/server_method_handler";
import getAllInstruments from "../../usecases/instrument/get_all_instruments";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/send_response_helper";

const getInstrumentsHandler: ServerMethodHandler = (_, response) => {
  getAllInstruments()
    .then((values) => {
      sendSuccessResponse(response, { instruments: values });
    })
    .catch((error: Error) => {
      sendErrorResponse(response, error);
    });
};

export default getInstrumentsHandler;
