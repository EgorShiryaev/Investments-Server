import {
  Bond,
  Currency,
  Etf,
  Future,
  Share,
} from 'tinkoff-invest-api/cjs/generated/instruments';
import Instrument from '../entities/instrument';
import InstrumentType from '../entities/instrument_type';

type Type = Share | Bond | Future | Etf | Currency;

export const convertItemToInstrument = (
  item: Type,
  instrumentType: InstrumentType
): Instrument => {
  return {
    figi: item.figi,
    ticker: item.ticker,
    title: item.name,
    lot: item.lot,
    currency: item.currency,
    instrumentType,
  };
};
