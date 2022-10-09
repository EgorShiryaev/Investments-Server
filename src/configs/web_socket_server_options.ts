import { ServerOptions } from "ws";
import Settings from "../../settings";

const webSocketServerOptions: ServerOptions = {
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: "/quotations",
};

export default webSocketServerOptions;
