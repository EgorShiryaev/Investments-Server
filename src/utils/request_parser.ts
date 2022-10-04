import { IncomingHttpHeaders } from "http";

const USER_UUID_KEY = "user-uuid";

export const getUserUuidHeader = (
  headers: IncomingHttpHeaders
): string | null => {
  const userUuid = headers[USER_UUID_KEY];
  if (userUuid === undefined) {
    return null;
  }
  if (typeof userUuid == "string") {
    return userUuid;
  }
  return userUuid[0];
};
