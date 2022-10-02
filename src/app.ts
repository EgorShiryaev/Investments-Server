import express from "express";
import getUser from "./methods/get_user";
import Settings from "../settings";
import {
  CurrenciesTableManager,
  InvestmentsTableManager,
  UsersTableManager,
  UserInvestmentsManager,
} from "../src/managers";
import postUserInvestment from "./methods/post_user_investment";
import deleteIdAttribute from "./response_parser";
import getUserInvestments from "./methods/get_user_investments";

const APP = express();
const jsonParser = express.json();

APP.listen(Settings.serverPort, Settings.serverUrl, () => {
  console.log("Success create server");
  UsersTableManager.createUsersTableIfNotExists();
  CurrenciesTableManager.createCurrenciesTableIfNotExists();
  InvestmentsTableManager.createInvestmentsTableIfNotExists();
  UserInvestmentsManager.createUserPortfolioInvestmentsTableIfNotExists();
});

const USER_UUID = "user-uuid";

APP.get("/user", (request, response) => {
  const userUuid = request.headers[USER_UUID];

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

APP.post("/userInvestment", jsonParser, (request, response) => {
  const userUuid = request.headers[USER_UUID];

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

APP.get("/userInvestment", (request, response) => {
  const userUuid = request.headers[USER_UUID];

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
