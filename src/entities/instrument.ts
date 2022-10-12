import { InstrumentType } from "tinkoff-invest-api/cjs/generated/operations";

interface Instrument {
  figi: string;
  ticker: string;
  title: string;
  lot: number;
  currency: string;
  instrumentType: InstrumentType;
}

export default Instrument;
