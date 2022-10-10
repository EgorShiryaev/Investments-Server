import { LastPrice } from "tinkoff-invest-api/cjs/generated/marketdata";
import investmentFigiPriceRepository from "../../repositories/investment_figi_price_repository";
import { getPrice } from "../../utils/tinkoff_invest_api_utils";

const lastPriceHandler = (lastPrice: LastPrice) => {
  const price = getPrice(lastPrice.price);

  if (price) {
    investmentFigiPriceRepository.updatePrice(lastPrice.figi, price);
  }
};

export default lastPriceHandler;
