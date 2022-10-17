const investmentFigiPriceRepository = new Map<string, number>();

const updatePrice = (figi: string, price: number)=> {
  investmentFigiPriceRepository.set(figi, price);
};

const getPrice = (figi: string) => {
  const price = investmentFigiPriceRepository.get(figi);

  return price ?? null;
};

export default {
  updatePrice,
  getPrice
};
