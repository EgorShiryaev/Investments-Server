import Instrument from '../../entities/instrument';
import InvestmentList from '../../entities/investment_list';
import InstrumentsTableManager from '../../managers/instrument_table_manager';
import { convertToInvestmentList } from '../../utils/convector';

const searchInstruments = async (
  query?: string
): Promise<InvestmentList<Instrument>> => {
  const instruments = await getInstruments(query);

  return convertToInvestmentList(instruments);
};

const getInstruments = (query?: string) => {
  if (query) {
    return InstrumentsTableManager.getAllWhereQueryIsExists(query);
  }
  return InstrumentsTableManager.getAll();
};

export default searchInstruments;
