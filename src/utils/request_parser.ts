import { IncomingHttpHeaders } from "http";
import { USER_UUID_PARAMETER_KEY } from "../constants";

export const getUserUuidHeader = (
  headers: IncomingHttpHeaders
): string | null => {
  const userUuid = headers[USER_UUID_PARAMETER_KEY];
  if (userUuid === undefined) {
    return null;
  }
  if (typeof userUuid == "string") {
    return userUuid;
  }
  return userUuid[0];
};

export const getUserUuidGetParams = (url?: string): string | null => {
  if (!url) {
    return null;
  }

  const params = url.split("?")[1].split("&");

  const paramsMap = new Map<string, string>();

  params.map((v) => {
    const [key, value] = v.split("=");
    paramsMap.set(key, value);
  });

  return paramsMap.get(USER_UUID_PARAMETER_KEY) ?? null;
};
