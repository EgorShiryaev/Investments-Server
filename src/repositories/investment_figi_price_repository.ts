const investmentFigiPriceRepository = new Map<string, number>()

const updatePrice = (figi: string, price: number): void => {
  investmentFigiPriceRepository.set(figi, price)
}

const getPrice = (figi: string): number | null => {
  const price = investmentFigiPriceRepository.get(figi)

  return price ?? null
}

export default {
  updatePrice,
  getPrice
}
