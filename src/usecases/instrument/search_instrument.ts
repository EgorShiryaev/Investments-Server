import InstrumentList from "../../entities/instrument_list";
import instrumentsTableManager from "../../managers/instruments_table_manager";
import InstrumentType from "../../models/instrument_type";

const searchInstrument = async (query: string): Promise<InstrumentList> => {
  const result = await instrumentsTableManager.getAllWhereQueryIsExists(query);

  const initialList: InstrumentList = {
    shares: [],
    bonds: [],
    etfs: [],
    futures: [],
    currencies: [],
  };

  const list: InstrumentList = result.reduce((prev, current) => {
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

  return list;
};

export default searchInstrument;
