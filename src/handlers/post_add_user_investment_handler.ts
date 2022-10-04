import { USER_UUID_HEADER_NOT_FOUND } from "../constants/errors";
import {
  BODY_PARAMETR_NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_POST_STATUS,
  USER_UUID_HEADER_NOT_FOUND_STATUS,
} from "../constants/response_statuses";
import InvestmentEntity from "../entities/investment_entity";
import createUserInvestment from "../functions/user_investments/create_user_investment";
import ServerMethodHandler from "../interfaces/server_method_handler";
import { getUserUuidHeader } from "../utils/request_parser";
import { parseToJson } from "../utils/response_convector";

const checkBodyParameters = (
  investment?: InvestmentEntity
): string | undefined => {
  if (!investment) {
    return 'Body parameter "investment" not found';
  }
  const parametersNotFound = [];
  if (!investment.prefix) {
    parametersNotFound.push("investment.prefix");
  }
  if (!investment.title) {
    parametersNotFound.push("investment.title");
  }
  if (!investment.currency) {
    parametersNotFound.push("investment.currency");
  } else {
    if (!investment.currency.code) {
      parametersNotFound.push("investment.currency.code");
    }
    if (!investment.currency.title) {
      parametersNotFound.push("investment.currency.title");
    }
  }

  if (parametersNotFound.length === 1) {
    return `Body parameter "${parametersNotFound[0]}" not found`;
  } else if (parametersNotFound.length > 1) {
    return `Body parameters ${parametersNotFound
      .map((v) => `"${v}"`)
      .join(", ")} not found`;
  }
};

const postAddUserInvestmentHandler: ServerMethodHandler = (
  request,
  response
) => {
  const userUuid = getUserUuidHeader(request.headers);

  const { investment } = request.body;

  if (userUuid === null) {
    response
      .status(USER_UUID_HEADER_NOT_FOUND_STATUS)
      .send(parseToJson({ message: USER_UUID_HEADER_NOT_FOUND }));
    return;
  }

  const bodyParametersNotFoundDescription = checkBodyParameters(investment);

  if (bodyParametersNotFoundDescription) {
    response
      .status(BODY_PARAMETR_NOT_FOUND_STATUS)
      .send(parseToJson({ message: bodyParametersNotFoundDescription }));
    return;
  }

  createUserInvestment(userUuid, investment)
    .then(() => {
      response.status(SUCCESS_POST_STATUS).send();
    })
    .catch((error: Error) => {
      response
        .status(SERVER_ERROR_STATUS)
        .send(parseToJson({ message: error.message }));
    });
};

export default postAddUserInvestmentHandler