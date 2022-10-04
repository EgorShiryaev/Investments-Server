import { APP } from "../app";
import getUserInvestments from "../methods/get_user_investments";
import USER_UUID_KEY from "./data/user_uuid_key";

const initGetUserInvestmentServerMethod = () => {
  APP.get("/userInvestment", (request, response) => {
    const userUuid = request.headers[USER_UUID_KEY];

    if (typeof userUuid === "string") {
      getUserInvestments(userUuid)
        .then((investments) => {
          response.send({ investments: investments });
        })
        .catch((error) => {
          response.status(500).send({ message: error });
        });
    } else {
      response.status(400).send({ message: "'userUuid' header not found" });
    }
  });
};

export default initGetUserInvestmentServerMethod;
