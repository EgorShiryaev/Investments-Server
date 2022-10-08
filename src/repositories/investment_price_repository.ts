const investmentPriceRepository = new Map<string, number>();

export const updatePrice = (prefix: string, price: number) => {
  investmentPriceRepository.set(prefix, price);
};

export const gerPrice = (prefix: string) => {
  const price = investmentPriceRepository.get(prefix);

  return price ?? null;
};

export const getPriceWithPrefix = (prefixes: string[]) => {
  const investments = prefixes.map((v) => ({ prefix: v, price: gerPrice(v) }));

  return investments;
};
