import Instrument from '../entities/instrument';
import InstrumentType from '../entities/instrument_type';
import InvestmentList from '../entities/investment_list';

export const convertToInvestmentList = (
  items: Instrument[]
): InvestmentList<Instrument> => {
  const initialList: InvestmentList<Instrument> = {
    shares: [],
    bonds: [],
    etfs: [],
    futures: [],
    currencies: [],
  };

  return items.reduce((prev, current) => {
    switch (current.instrumentType) {
    case InstrumentType.bond:
      prev.bonds.push(current);
      break;
    case InstrumentType.currency:
      prev.currencies.push(current);
      break;
    case InstrumentType.etf:
      prev.etfs.push(current);
      break;
    case InstrumentType.futures:
      prev.futures.push(current);
      break;
    case InstrumentType.share:
      prev.shares.push(current);
      break;
    }

    return prev;
  }, initialList);
};

export const convertToJson = (obj:object) => {
  return JSON.stringify(obj);
};