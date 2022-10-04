import express from "express";
import { ServerOptions, WebSocketServer } from "ws";
import Settings from "../settings";
import {
  CurrenciesTableManager,
  InvestmentsTableManager,
  UsersTableManager,
  UserInvestmentsManager,
} from "../src/managers";
import initMethods from "./server";

export const APP = express();
export const jsonParser = express.json();

const wssOptions: ServerOptions = {
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: "/quotations",
};

export const WebSocketServerInstance = new WebSocketServer(wssOptions);

initMethods();

APP.listen(Settings.serverPort, Settings.serverUrl, () => {
  console.log("Success create server");
  UsersTableManager.createUsersTableIfNotExists();
  CurrenciesTableManager.createCurrenciesTableIfNotExists();
  InvestmentsTableManager.createInvestmentsTableIfNotExists();
  UserInvestmentsManager.createUserPortfolioInvestmentsTableIfNotExists();
});
