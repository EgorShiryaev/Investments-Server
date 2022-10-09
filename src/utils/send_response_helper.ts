import { Response } from "express";
import {
  BODY_PARAMETER_NOT_FOUND_STATUS,
  SERVER_ERROR_STATUS,
  SUCCESS_GET_STATUS,
  SUCCESS_POST_STATUS,
  SUCCESS_POST_WITH_OUT_CONTENT_STATUS,
  USER_NOT_FOUND,
  USER_NOT_FOUND_STATUS,
  USER_UUID_HEADER_NOT_FOUND,
  USER_UUID_HEADER_NOT_FOUND_STATUS,
} from "../constants";
import { parseToJson } from "./response_convector";

export const sendUserUuidHeaderNotFoundResponse = (response: Response) => {
  response
    .status(USER_UUID_HEADER_NOT_FOUND_STATUS)
    .send(parseToJson({ message: USER_UUID_HEADER_NOT_FOUND }));
};

export const sendUserNotFoundResponse = (response: Response) => {
  response
    .status(USER_NOT_FOUND_STATUS)
    .send(parseToJson({ message: USER_NOT_FOUND }));
};

export const sendGetSuccessResponse = (response: Response, body: object) => {
  response.status(SUCCESS_GET_STATUS).send(parseToJson(body));
};

export const sendServerErrorResponse = (response: Response, error: Error) => {
  response
    .status(SERVER_ERROR_STATUS)
    .send(parseToJson({ message: error.message }));
};

export const sendBodyParametersNotFoundResponse = (
  response: Response,
  message: string
) => {
  response
    .status(BODY_PARAMETER_NOT_FOUND_STATUS)
    .send(parseToJson({ message: message }));
};

export const sendPostSuccessWithOutContentResponse = (response: Response) => {
  response.status(SUCCESS_POST_WITH_OUT_CONTENT_STATUS).send();
};

export const sendPostSuccessResponse = (response: Response, body: object) => {
  response.status(SUCCESS_POST_STATUS).send(parseToJson(body));
};
