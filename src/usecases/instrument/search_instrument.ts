import Instrument from '../../entities/instrument'
import InstrumentList from '../../entities/instrument_list'
import instrumentsTableManager from '../../managers/instruments_table_manager'
import { convertToInvestmentList } from '../../utils/convector'

const searchInstrument = async (
  query: string
): Promise<InstrumentList<Instrument>> => {
  const instruments = await instrumentsTableManager.getAllWhereQueryIsExists(query)

  const list = convertToInvestmentList(instruments)

  return list
}

export default searchInstrument
