export enum WebSocketOperation {
  subscribe = "subscribe",
  unsubscribe = "unsubscribe",
}

interface WebSocketMessage {
  operation: WebSocketOperation;
  prefix: string;
}

export default WebSocketMessage;
