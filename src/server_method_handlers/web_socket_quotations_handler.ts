// import { IncomingMessage } from 'http';
// import WebSocket from 'ws';
// import {
// 	getUserUuidGetParams,
// 	parseToJson
// } from '../utils/request_parameter_parser';
// import {
// 	investmentFigiPriceRepository,
// 	userSubscribeInvestmentFigisRepository
// } from '../repositories';
// import Quotation from '../entities/quotation';
// import WebSocketOperation from '../interfaces/web_socket_operation';

const webSocketQuantitionsHandler = (
  // ws: WebSocket.WebSocket,
  // request: IncomingMessage
) => {
  // const userUuid = getUserUuidGetParams(request.url);
  // if (userUuid === null) {
  // 	ws.send(
  // 		parseToJson({ status: 'fail', message: 'parameter "userUuid" not found' })
  // 	);
  // 	ws.close();
  // 	return;
};

// 	console.log('connect userUuid:', userUuid);

// 	ws.on('message', (raw) => messsageHandler(raw, userUuid));

// 	const responseInterval = setResponseInterval(ws, userUuid);

// 	ws.on('close', () => closeHandler(ws, responseInterval, userUuid));
// };

// const messsageHandler = (data: WebSocket.RawData, userUuid: string): void => {
// 	// @ts-expect-error
// 	const { operation, figi }: WebSocketMessage = JSON.parse(data);

// 	if (operation === WebSocketOperation.subscribe) {
// 		userSubscribeInvestmentFigisRepository.addUserInvestmentFigi(
// 			userUuid,
// 			figi
// 		);
// 	} else if (operation === WebSocketOperation.unsubscribe) {
// 		userSubscribeInvestmentFigisRepository.deleteUserInvestmentFigi(
// 			userUuid,
// 			figi
// 		);
// 	}
// };

// const timerMs = 2000;

// const setResponseInterval = (
// 	ws: WebSocket.WebSocket,
// 	userUuid: string
// ): NodeJS.Timer => {
// 	return setInterval(() => {
// 		// @ts-expect-error
// 		const quotations: Quotation[] = userSubscribeInvestmentFigisRepository
// 			.getUserInvestmentFigis(userUuid)
// 			.map((v) => {
// 				const price = investmentFigiPriceRepository.getPrice(v);
// 				if (price !== null) {
// 					return {
// 						figi: v,
// 						price
// 					};
// 				}
// 				return null;
// 			})
// 			.filter((v) => v !== null);
// 		ws.send(parseToJson({ quotations }));
// 	}, timerMs);
// };

// const closeHandler = (
// 	ws: WebSocket.WebSocket,
// 	interval: NodeJS.Timer,
// 	userUuid: string
// ): void => {
// 	console.log('close userUuid:', userUuid);
// 	userSubscribeInvestmentFigisRepository.deleteAllUserInvestmentFigis(userUuid);
// 	clearInterval(interval);
// 	ws.close();
// };

export default webSocketQuantitionsHandler;
