import { Response } from "express";
import {
  NOT_FOUND_STATUS,
  PARAMETER_NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_STATUS,
} from "../constants/response_statuses";
import { parseToJson } from "./request_parser";

const sendResponse = (response: Response, status: number, body: object) => {
  response.header("content-type", "application/json");
  response.status(status).send(parseToJson(body));
};

export const sendNotFoundResponse = (response: Response, message: string) => {
  sendResponse(response, NOT_FOUND_STATUS, { message: message });
};

export const sendServerErrorResponse = (
  response: Response,
  message: string
) => {
  sendResponse(response, SERVER_ERROR_STATUS, { message: message });
};

export const sendParameterNotFoundResponse = (
  response: Response,
  message: string
) => {
  sendResponse(response, PARAMETER_NOT_FOUND_STATUS, { message: message });
};

export const sendSuccessResponse = (response: Response, body: object) => {
  sendResponse(response, SUCCESS_STATUS, body);
};
