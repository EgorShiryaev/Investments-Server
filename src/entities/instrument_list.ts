import Instrument from "./instrument";

interface InstrumentList {
  shares: Instrument[];
  bonds: Instrument[];
  etfs: Instrument[];
  futures: Instrument[];
  currencies: Instrument[];
}

export default InstrumentList