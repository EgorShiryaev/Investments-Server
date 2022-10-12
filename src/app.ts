import express from "express";
import { WebSocketServer } from "ws";
import Settings from "../settings";
import { USER_PATH } from "./constants/method_paths";
import getUserHandler from "./handlers/get_user_handler";
import postUserHandler from "./handlers/post_user_handler";
import webSocketQuantitionsHandler from "./handlers/web_socket_quotations_handler";

const app = express();
const jsonParser = express.json();

app.listen(Settings.serverPort, Settings.serverUrl, () => {
  console.log("Success create server");
});

app.get(USER_PATH, getUserHandler);
app.post(USER_PATH, jsonParser, postUserHandler);

const WebSocketServerInstance = new WebSocketServer({
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: "/quotations",
});

WebSocketServerInstance.on("connection", webSocketQuantitionsHandler);
