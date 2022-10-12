import {
  SubscribeLastPriceRequest,
  SubscriptionAction,
} from "tinkoff-invest-api/cjs/generated/marketdata";
import TINKOFF_INVEST_API from "../tinkoff_invest_api";

const unsubscribeLastPriceInvestment = (figi: string) => {
  const request: SubscribeLastPriceRequest = {
    instruments: [
      {
        figi: figi,
      },
    ],
    subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE,
  };

  TINKOFF_INVEST_API.stream.market.lastPrice(request, () => {});
};

export default unsubscribeLastPriceInvestment;
