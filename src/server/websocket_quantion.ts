import { WebSocketServerInstance } from "../app";

const initWebSocketQuantion = () => {
  WebSocketServerInstance.on("connection", (ws) => {
    ws.on("message", (data) => {
      console.log("received: %s", data);
    });

    const statusResponse = JSON.stringify({ status: "connected" });
    ws.send(statusResponse);
  });
};

export default initWebSocketQuantion;
