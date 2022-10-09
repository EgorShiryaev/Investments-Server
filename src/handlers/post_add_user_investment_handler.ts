import { createUserInvestment } from "../functions";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { checkAddUserInvestmentBodyParameteres } from "../utils/body_parameter_helper";
import { getUserUuidHeader } from "../utils/request_parser";
import { setHeaderContentType } from "../utils/response_convector";
import {
  sendBodyParametersNotFoundResponse,
  sendPostSuccessWithOutContentResponse,
  sendServerErrorResponse,
  sendUserUuidHeaderNotFoundResponse,
} from "../utils/send_response_helper";

const postAddUserInvestmentHandler: ServerMethodHandler = (
  request,
  response
) => {
  const userUuid = getUserUuidHeader(request.headers);

  setHeaderContentType(response);

  const { investment } = request.body;

  if (userUuid === null) {
    sendUserUuidHeaderNotFoundResponse(response);
    return;
  }

  const bodyParametersNotFoundDescription =
    checkAddUserInvestmentBodyParameteres(investment);

  if (bodyParametersNotFoundDescription) {
    sendBodyParametersNotFoundResponse(
      response,
      bodyParametersNotFoundDescription
    );
    return;
  }

  createUserInvestment(userUuid, investment)
    .then(() => {
      sendPostSuccessWithOutContentResponse(response);
    })
    .catch((error: Error) => {
      sendServerErrorResponse(response, error);
    });
};

export default postAddUserInvestmentHandler;
