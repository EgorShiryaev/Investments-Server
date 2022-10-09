import {
  SubscribeLastPriceRequest,
  SubscriptionAction,
} from "tinkoff-invest-api/cjs/generated/marketdata";
import lastPriceHandler from "../handlers/last_price_handler";
import TINKOFF_INVEST_API from "../tinkoff_invest_api";

const subscribeLastPriceInvestment = (figi: string) => {
  const request: SubscribeLastPriceRequest = {
    instruments: [
      {
        figi: figi,
      },
    ],
    subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE,
  };

  TINKOFF_INVEST_API.stream.market.lastPrice(request, lastPriceHandler);
};

export default subscribeLastPriceInvestment;
