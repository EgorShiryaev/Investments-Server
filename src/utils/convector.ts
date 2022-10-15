import Instrument from '../entities/instrument'
import InstrumentList from '../entities/instrument_list'
import InstrumentType from '../models/instrument_type'

export const convertToInvestmentList = (
  items: Instrument[]
): InstrumentList<Instrument> => {
  const initialList: InstrumentList<Instrument> = {
    shares: [],
    bonds: [],
    etfs: [],
    futures: [],
    currencies: []
  }

  return items.reduce((prev, current) => {
    switch (current.instrumentType) {
      case InstrumentType.bond:
        prev.bonds.push(current)
        break
      case InstrumentType.currency:
        prev.currencies.push(current)
        break
      case InstrumentType.etf:
        prev.etfs.push(current)
        break
      case InstrumentType.futures:
        prev.futures.push(current)
        break
      case InstrumentType.share:
        prev.shares.push(current)
        break
    }

    return prev
  }, initialList)
}
