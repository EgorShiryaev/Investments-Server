import express from "express";
import { WebSocketServer } from "ws";
import Settings from "../settings";
import { USER_PATH } from "./constants/method_paths";
import deleteUserHandler from "./handlers/delete_user_handler";
import getUserHandler from "./handlers/get_user_handler";
import postUserHandler from "./handlers/post_user_handler";
import putUserHandler from "./handlers/put_user_handler";
import webSocketQuantitionsHandler from "./handlers/web_socket_quotations_handler";
import deleteUser from "./usecases/delete_user";

const app = express();
const jsonParser = express.json();

app.listen(Settings.serverPort, Settings.serverUrl, () => {
  console.log("Success create server");
});

app.get(USER_PATH, getUserHandler);
app.post(USER_PATH, jsonParser, postUserHandler);
app.put(USER_PATH, jsonParser, putUserHandler);
app.delete(USER_PATH, deleteUserHandler);

const WebSocketServerInstance = new WebSocketServer({
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: "/quotations",
});

WebSocketServerInstance.on("connection", webSocketQuantitionsHandler);
