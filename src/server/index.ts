import initGetUserServerMethod from "./get_user";
import initPostUserInvestmentServerMethod from "./post_user_investment";
import initGetUserInvestmentServerMethod from "./get_user_investment";
import initWebSocketQuantion from "./websocket_quantion";

const initMethods = () => {
  initGetUserServerMethod();
  initPostUserInvestmentServerMethod();
  initGetUserInvestmentServerMethod();
  initWebSocketQuantion();
};

export default initMethods;
