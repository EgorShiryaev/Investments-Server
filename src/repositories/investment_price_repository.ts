const investmentPriceRepository = new Map<string, number>();

const updatePrice = (ticker: string, price: number) => {
  investmentPriceRepository.set(ticker, price);
};

const getPrice = (ticker: string) => {
  const price = investmentPriceRepository.get(ticker);

  return price ?? null;
};

export default {
  updatePrice,
  getPrice,
};
