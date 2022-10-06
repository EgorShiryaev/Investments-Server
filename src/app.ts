import express from "express";
import { ServerOptions, WebSocketServer } from "ws";
import Settings from "../settings";
import {
  CurrenciesTableManager,
  InvestmentsTableManager,
  UsersTableManager,
  UserInvestmentsManager,
} from "../src/managers";
import {
  ADD_USER_INVESTMENT_PATH,
  USER_INVESTMENTS_PATH,
  USER_PATH,
} from "./constants/method_paths";
import getUserHandler from "./handlers/get_user_handler";
import getUserInvestmentsHandler from "./handlers/get_user_investments_handler";
import postAddUserInvestmentHandler from "./handlers/post_add_user_investment_handler";
import postUserHandler from "./handlers/post_user_handler";
import { setHeaderContentType } from "./utils/response_convector";

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
app.get(USER_INVESTMENTS_PATH, getUserInvestmentsHandler);
app.post(ADD_USER_INVESTMENT_PATH, jsonParser, postAddUserInvestmentHandler);

const wssOptions: ServerOptions = {
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: "/quotations",
};

export const WebSocketServerInstance = new WebSocketServer(wssOptions);
