import subscribeLastPriceInvestment from "../api/functions/subscribe_last_price_investment";
import unsubscribeLastPriceInvestment from "../api/functions/unsubscribe_last_price_investment";

const figiNumberOfSubscriptionsRepository = new Map<string, number>();

const incrementSubscribtion = (figi: string) => {
  const numberOfSubscriptions = figiNumberOfSubscriptionsRepository.get(figi);

  if (numberOfSubscriptions === undefined) {
    figiNumberOfSubscriptionsRepository.set(figi, 1);
    subscribeLastPriceInvestment(figi);
  } else {
    figiNumberOfSubscriptionsRepository.set(figi, numberOfSubscriptions + 1);
  }
};

const decrementSubscribtion = (figi: string) => {
  const numberOfSubscriptions = figiNumberOfSubscriptionsRepository.get(figi);

  if (numberOfSubscriptions === 0) {
    unsubscribeLastPriceInvestment(figi);
  }

  if (!(numberOfSubscriptions === undefined || numberOfSubscriptions === 0)) {
    figiNumberOfSubscriptionsRepository.set(figi, numberOfSubscriptions - 1);
  }
};

const deleteAllSubscribtions = () => {
  figiNumberOfSubscriptionsRepository.clear();
};

export default {
  incrementSubscribtion,
  decrementSubscribtion,
  deleteAllSubscribtions,
};
