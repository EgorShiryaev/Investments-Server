import {
  SubscribeLastPriceRequest,
  SubscriptionAction
} from 'tinkoff-invest-api/cjs/generated/marketdata'
import { investmentFigiPriceRepository } from '../repositories'
import TINKOFF_INVEST_API from '../tinkoff_invest_api'
import { getPrice } from '../utils/tinkoff_invest_api_utils'

const subscribeLastPriceInvestment = (figi: string): void => {
  const request: SubscribeLastPriceRequest = {
    instruments: [
      {
        figi
      }
    ],
    subscriptionAction: SubscriptionAction.SUBSCRIPTION_ACTION_SUBSCRIBE
  }

  TINKOFF_INVEST_API.stream.market
    .lastPrice(request, (lastPrice) => {
      const price = getPrice(lastPrice.price)

      if (price !== null) {
        investmentFigiPriceRepository.updatePrice(lastPrice.figi, price)
      }
    })
    .then(() => {})
    .catch(() => {})
}

export default subscribeLastPriceInvestment
