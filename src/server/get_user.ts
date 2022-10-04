import { APP } from "../app";
import USER_UUID_KEY from "./data/user_uuid_key";
import getUser from "../methods/get_user";
import deleteIdAttribute from "../response_parser";

const initGetUserServerMethod = () => {
  APP.get("/user", (request, response) => {
    const userUuid = request.headers[USER_UUID_KEY];

    if (typeof userUuid === "string") {
      getUser(userUuid)
        .then((user) => {
          response.send({ user: deleteIdAttribute(user) });
        })
        .catch((error) => {
          response.status(500).send({ message: error });
        });
    } else {
      response.status(400).send({ message: "'userUuid' header not found" });
    }
  });
};

export default initGetUserServerMethod;
