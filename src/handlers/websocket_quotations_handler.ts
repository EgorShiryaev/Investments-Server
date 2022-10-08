import { IncomingMessage } from "http";
import WebSocket from "ws";
import WebSocketMessage, {
  WebSocketOperation,
} from "../models/websocket_message";
import UserSubscribeInvestmentRepository from "../repositories/user_subscribe_investments_repository";
import { getUserUuidGetParams } from "../utils/request_parser";
import { parseToJson } from "../utils/response_convector";

const timerMs = 2000;

const webSocketQuantitionsHandler = (
  ws: WebSocket.WebSocket,
  request: IncomingMessage
) => {
  const userUuid = getUserUuidGetParams(request.url);

  if (userUuid === null) {
    ws.send(
      parseToJson({ status: "fail", message: 'parameter "userUuid" not found' })
    );
    ws.close();
    return;
  }

  ws.on("message", (data: WebSocket.RawData) => {
    console.log("onMessage", userUuid);

    //@ts-ignore
    const { operation, prefix }: WebSocketMessage = JSON.parse(data.toString());

    if (operation === WebSocketOperation.subscribe) {
      UserSubscribeInvestmentRepository.addUserPrefix(userUuid, prefix);
    } else if (operation === WebSocketOperation.unsubscribe) {
      UserSubscribeInvestmentRepository.deleteUserPrefix(userUuid, prefix);
    }
  });

  const interval = setInterval(() => {
    const quotations = UserSubscribeInvestmentRepository.getUserPrefixes(
      userUuid
    ).map((v) => ({
      prefix: v,
      price: Math.random(),
    }));
    console.log("send", userUuid, quotations);
    ws.send(parseToJson({ quotations: quotations }));
  }, timerMs);

  ws.on("close", () => {
    console.log("onClose", userUuid);
    UserSubscribeInvestmentRepository.deleteAllUserPrefixes(userUuid);
    clearInterval(interval);
  });

  const statusResponse = parseToJson({ status: "success" });
  ws.send(statusResponse);
};

export default webSocketQuantitionsHandler;
