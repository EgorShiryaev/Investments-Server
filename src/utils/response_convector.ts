import { Response } from "express";

export const parseToJson = (obj: Object) => {
  return JSON.stringify(obj);
};

export const setHeaderContentType = (response: Response) => {
  response.header("content-type", "application/json");
};
