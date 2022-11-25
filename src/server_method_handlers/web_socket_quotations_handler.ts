import { IncomingMessage } from 'http';
import WebSocket from 'ws';
import Quotation from '../entities/quotation';
import WebSocketOperation from '../interfaces/web_socket_operation';
import { convertToJson } from '../utils/convector';
import UserSubscribeInvestmentFigisRepository from '../repositories/user_subscribe_investment_figis_repository';
import InvestmentFigiPriceRepository from '../repositories/investment_figi_price_repository';
import WebSocketMessage from '../interfaces/web_socket_message';

const getUserUuid = (url?: string) => {
  if (url === undefined) {
    return undefined;
  }
  const params = url.split('?')[1].split('&');

  const obj = new Map<string, string>();

  for (const iterator of params) {
    const [key, value] = iterator.split('=');
    obj.set(key, value);
  }

  return obj.get('userUuid');
};

const webSocketQuantitionsHandler = (
  ws: WebSocket.WebSocket,
  request: IncomingMessage
) => {
  const userUuid = getUserUuid(request.url);

  if (userUuid == undefined) {
    ws.send(
      convertToJson({
        status: 'fail',
        message: 'userUuid not fount',
      })
    );
    ws.close();
    return;
  }

  console.log('connect userUuid:', userUuid);

  ws.on('message', (raw) => messsageHandler(raw, userUuid));

  const responseInterval = setResponseInterval(ws, userUuid);

  ws.on('close', () => closeHandler(ws, responseInterval, userUuid));
};

const messsageHandler = (data: WebSocket.RawData, userUuid: string): void => {
  const { operation, figi }: WebSocketMessage = JSON.parse(data.toString());

  console.log(operation, figi);

  if (operation === WebSocketOperation.subscribe) {
    UserSubscribeInvestmentFigisRepository.addUserInvestmentFigi(
      userUuid,
      figi
    );
  } else if (operation === WebSocketOperation.unsubscribe) {
    UserSubscribeInvestmentFigisRepository.deleteUserInvestmentFigi(
      userUuid,
      figi
    );
  }
};

const setResponseInterval = (
  ws: WebSocket.WebSocket,
  userUuid: string
): NodeJS.Timer => {
  return setInterval(() => {
    const figis =
      UserSubscribeInvestmentFigisRepository.getUserInvestmentFigis(userUuid);

    const quotations: Map<string, number> = new Map<string, number>();

    figis.forEach((v) => {
      const price = InvestmentFigiPriceRepository.getPrice(v);

      if (price !== null) {
        quotations.set(v, price);
      }
    });

    ws.send(convertToJson({ quotations: Object.fromEntries(quotations) }));
  }, 500);
};

const closeHandler = (
  ws: WebSocket.WebSocket,
  interval: NodeJS.Timer,
  userUuid: string
): void => {
  console.log('close userUuid:', userUuid);

  UserSubscribeInvestmentFigisRepository.deleteAllUserInvestmentFigis(userUuid);
  clearInterval(interval);
  ws.close();
};

export default webSocketQuantitionsHandler;
