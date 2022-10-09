import WebSocketOperation from "./web_socket_operation";

interface WebSocketMessage {
  operation: WebSocketOperation;
  ticker: string;
}

export default WebSocketMessage;
