import express from "express";
import { WebSocketServer } from "ws";
import Settings from "../settings";
import {
  ADD_USER_INVESTMENT_PATH,
  USER_INVESTMENTS_PATH,
  USER_PATH,
} from "./constants";
import {
  getUserHandler,
  postAddUserInvestmentHandler,
  postUserHandler,
  getUserInvestsHandler,
  webSocketQuantitionsHandler,
} from "./handlers";
import {
  CurrenciesTableManager,
  InvestmentsTableManager,
  UserInvestmentsManager,
  UsersTableManager,
} from "./managers";
import webSocketServerOptions from "./server/websocket_server_options";

const app = express();
const jsonParser = express.json();

app.listen(Settings.serverPort, Settings.serverUrl, () => {
  console.log("Success create server");
  UsersTableManager.createTableIfNotExists();
  CurrenciesTableManager.createTableIfNotExists();
  InvestmentsTableManager.createTableIfNotExists();
  UserInvestmentsManager.createTableIfNotExists();
});

app.get(USER_PATH, getUserHandler);
app.post(USER_PATH, jsonParser, postUserHandler);
app.get(USER_INVESTMENTS_PATH, getUserInvestsHandler);
app.post(ADD_USER_INVESTMENT_PATH, jsonParser, postAddUserInvestmentHandler);

const WebSocketServerInstance = new WebSocketServer(webSocketServerOptions);

WebSocketServerInstance.on("connection", webSocketQuantitionsHandler);
