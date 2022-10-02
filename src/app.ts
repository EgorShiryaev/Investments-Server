import express from "express";
import getUser from "./methods/get_user";
import Settings from "../settings";
import {
  CurrenciesTableManager,
  InvestmentsTableManager,
  UsersTableManager,
  UserPortfolioInvestmentsManager,
} from "../src/managers";

const APP = express();

APP.get("/user", (request, response) => {
  console.log("query", request.query);

  const { uuid } = request.query;

  if (typeof uuid === "string") {
    getUser(uuid)
      .then((user) => {
        response.send({ user: user });
      })
      .catch((error) => {
        response.status(500).send({ message: error });
      });
  } else {
    response.status(400).send({ message: "'uuid' parameter not found" });
  }
});

APP.listen(Settings.serverPort, Settings.serverUrl, () => {
  console.log("Success create server");
  UsersTableManager.createUsersTableIfNotExists();
  CurrenciesTableManager.createCurrenciesTableIfNotExists();
  InvestmentsTableManager.createInvestmentsTableIfNotExists();
  UserPortfolioInvestmentsManager.createUserPortfolioInvestmentsTableIfNotExists();
});
