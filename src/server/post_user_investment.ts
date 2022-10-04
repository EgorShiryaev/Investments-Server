import { APP, jsonParser } from "../app";
import USER_UUID_KEY from "./data/user_uuid_key";
import postUserInvestment from "../methods/post_user_investment";

const initPostUserInvestmentServerMethod = () => {
  APP.post("/userInvestment", jsonParser, (request, response) => {
    const userUuid = request.headers[USER_UUID_KEY];

    const { investment } = request.body;

    if (typeof userUuid === "string" && investment) {
      postUserInvestment(userUuid, investment)
        .then((investment) => {
          response.send(investment);
        })
        .catch((error) => {
          response.status(500).send({ message: error });
        });
    } else {
      const message =
        !userUuid &&
        "'userUuid' header not found'" + !investment &&
        "'investment' body parameter not found";

      response.status(400).send({
        message: message,
      });
    }
  });
};

export default initPostUserInvestmentServerMethod