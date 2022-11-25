import { Response } from 'express';
import { IS_EXISTS_ERRORS, NOT_FOUND_ERRORS } from '../constants/errors';
import { convertToJson } from './convector';

const sendResponse = (response: Response, code: number, body?: object) => {
  response.header('content-type', 'application/json');

  const resWithStatus = response.status(code);

  if (body === undefined) {
    resWithStatus.send();
    return;
  }
  resWithStatus.send(convertToJson(body));
};

const parameterNotFoundCode = 400;

export const sendParameterNotFoundResponse = (
  response: Response,
  errors: string[]
) => {
  sendResponse(response, parameterNotFoundCode, {
    errors: errors,
  });
};

const successCode = 200;

export const sendSuccessResponse = (response: Response, body?: object) => {
  sendResponse(response, successCode, body);
};

const serverErrorCode = 500;
const itemNotFoundCode = 404;
const itemIsExistsCode = 402;

export const sendErrorResponse = (response: Response, error: Error) => {
  const send = (code: number) => {
    sendResponse(response, code, { message: error.message });
  };

  if (NOT_FOUND_ERRORS.includes(error.message)) {
    send(itemNotFoundCode);
  } else if (IS_EXISTS_ERRORS.includes(error.message)) {
    send(itemIsExistsCode);
  } else {
    send(serverErrorCode);
  }
};
