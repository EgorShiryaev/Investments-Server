import { Request, Response } from "express";
import {
  ITEM_NOT_FOUND_ERRORS,
  USER_UUID_HEADER_NOT_FOUND,
} from "../constants/errors";
import {
  ITEM_NOT_FOUND_STATUS,
  PARAMETER_NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
} from "../constants/response_statuses";
import {
  checkSearchInvestmentQueryParametersIsNotExist,
  checkUserRequestBodyParametersIsNotExist,
} from "./check_request_parameters";
import { generateUserBodyParametersErrorMessage } from "./generate_error_message";
import { getUserUuidHeader, parseToJson } from "./request_parameter_parser";

const sendResponse = (response: Response, status: number, body: object) => {
  response.header("content-type", "application/json");
  response.status(status).send(parseToJson(body));
};

export const sendErrorResponse = (response: Response, error: Error) => {
  const { message } = error;

  if (ITEM_NOT_FOUND_ERRORS.includes(message)) {
    sendResponse(response, ITEM_NOT_FOUND_STATUS, { message: message });
  } else if (message.includes("not found")) {
    sendResponse(response, PARAMETER_NOT_FOUND_STATUS, { message: message });
  } else {
    sendResponse(response, SERVER_ERROR_STATUS, { message: message });
  }
};

export const sendSuccessResponse = (response: Response, body: object) => {
  sendResponse(response, SUCCESS_STATUS, body);
};

export const getUserUuidElseSendErrorResponse = (
  request: Request,
  response: Response
) => {
  const userUuid = getUserUuidHeader(request.headers);

  if (userUuid === null) {
    sendErrorResponse(response, Error(USER_UUID_HEADER_NOT_FOUND));
  }

  return userUuid;
};

export const getUserBodyParametersElseSendErrorResponse = (
  request: Request,
  response: Response
): { name: string | null; surname: string | null } | null => {
  const { name, surname } = request.body;

  const requestParametersIsNotExist = checkUserRequestBodyParametersIsNotExist(
    name,
    surname
  );

  if (requestParametersIsNotExist) {
    sendErrorResponse(
      response,
      Error(generateUserBodyParametersErrorMessage(name, surname))
    );
    return null;
  }
  return { name, surname };
};

export const getSearchInvestmentQueryParameters = (
  request: Request,
  response: Response
): { query: string } | null => {
  const { query } = request.query;

  const isNotExists = checkSearchInvestmentQueryParametersIsNotExist(
    query as string | undefined
  );

  if (isNotExists) {
    sendErrorResponse(response, Error("Parameter 'query' not found"));
    return null;
  }

  return {
    query: (typeof query === "string" ? query : (query as string[])[0]).trim(),
  };
};
