import subscribeLastPriceInvestment from '../usecases/subscribe_last_price_investment';
import unsubscribeLastPriceInvestment from '../usecases/unsubscribe_last_price_investment';

const investmentFigiNumberOfSubscriptionsRepository = new Map<string, number>();

const incrementSubscribtion = (figi: string) => {
  const numberOfSubscriptions =
    investmentFigiNumberOfSubscriptionsRepository.get(figi);

  if (numberOfSubscriptions === undefined) {
    investmentFigiNumberOfSubscriptionsRepository.set(figi, 1);
    subscribeLastPriceInvestment(figi);
  } else {
    investmentFigiNumberOfSubscriptionsRepository.set(
      figi,
      numberOfSubscriptions + 1
    );
  }
};

const decrementSubscribtion = (figi: string) => {
  const numberOfSubscriptions =
    investmentFigiNumberOfSubscriptionsRepository.get(figi);

  if (numberOfSubscriptions === 1) {
    unsubscribeLastPriceInvestment(figi);
  }

  if ((numberOfSubscriptions !== undefined && numberOfSubscriptions > 0 )) {
    investmentFigiNumberOfSubscriptionsRepository.set(
      figi,
      numberOfSubscriptions - 1
    );
  }
};

const deleteAllSubscribtions = () => {
  investmentFigiNumberOfSubscriptionsRepository.clear();
};

export default {
  incrementSubscribtion,
  decrementSubscribtion,
  deleteAllSubscribtions,
};
