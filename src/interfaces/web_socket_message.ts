import WebSocketOperation from './web_socket_operation';

interface WebSocketMessage {
  operation: WebSocketOperation
  figi: string
}

export default WebSocketMessage;
