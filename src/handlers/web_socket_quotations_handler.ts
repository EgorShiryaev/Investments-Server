import { IncomingMessage } from "http";
import WebSocket from "ws";
import { WebSocketOperation } from "../models";
import { getUserUuidGetParams } from "../utils/request_parser";
import { parseToJson } from "../utils/response_convector";
import { userSubscribeInvestmentFigisRepository } from "../repositories";

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

  console.log("connect userUuid:", userUuid);

  ws.on("message", (raw) => messsageHandler(raw, userUuid));

  const responseInterval = setResponseInterval(ws, userUuid);

  ws.on("close", () => closeHandler(ws, responseInterval, userUuid));
};

const messsageHandler = (data: WebSocket.RawData, userUuid: string) => {
  //@ts-ignore
  const { operation, figi }: WebSocketMessage = JSON.parse(data.toString());

  if (operation === WebSocketOperation.subscribe) {
    userSubscribeInvestmentFigisRepository.addUserInvestmentFigi(
      userUuid,
      figi
    );
  } else if (operation === WebSocketOperation.unsubscribe) {
    userSubscribeInvestmentFigisRepository.deleteUserInvestmentFigi(
      userUuid,
      figi
    );
  }
};

const timerMs = 2000;

const setResponseInterval = (ws: WebSocket.WebSocket, userUuid: string) => {
  return setInterval(() => {
    const quotations = userSubscribeInvestmentFigisRepository
      .getUserInvestmentFigis(userUuid)
      .map((v) => ({
        ticker: v,
        price: Math.random(),
      }));
    ws.send(parseToJson({ quotations: quotations }));
  }, timerMs);
};

const closeHandler = (
  ws: WebSocket.WebSocket,
  interval: NodeJS.Timer,
  userUuid: string
) => {
  console.log("close userUuid:", userUuid);
  userSubscribeInvestmentFigisRepository.deleteAllUserInvestmentFigis(userUuid);
  clearInterval(interval);
  ws.close();
};

export default webSocketQuantitionsHandler;
