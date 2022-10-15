import { Bond, Currency, Etf, Future, Share } from 'tinkoff-invest-api/cjs/generated/instruments'
import Instrument from '../entities/instrument'

type Type = Share | Bond | Future | Etf | Currency

export const convertItemToInstrument = (
  item: Type,
  instrumentType: string
): Instrument => {
  return {
    figi: item.figi,
    ticker: item.ticker,
    title: item.name,
    lot: item.lot,
    currency: item.currency,
    instrumentType
  }
}
