import { WebSocketServer } from 'ws';
import Settings from '../settings';
import webSocketQuantitionsHandler from './server_method_handlers/web_socket_quotations_handler';

const WebSocketServerInstance = new WebSocketServer({
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: '/quotations'
});

WebSocketServerInstance.on('connection', webSocketQuantitionsHandler);
