import {
  SubscribeLastPriceRequest,
  SubscriptionAction
} from 'tinkoff-invest-api/cjs/generated/marketdata'
import TINKOFF_INVEST_API from '../tinkoff_invest_api'

const unsubscribeLastPriceInvestment = (figi: string): void => {
  const request: SubscribeLastPriceRequest = {
    instruments: [
      {
        figi
      }
    ],
    subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_UNSUBSCRIBE
  }

  TINKOFF_INVEST_API.stream.market
    .lastPrice(request, () => {})
    .then(() => {})
    .catch(() => {})
}

export default unsubscribeLastPriceInvestment
