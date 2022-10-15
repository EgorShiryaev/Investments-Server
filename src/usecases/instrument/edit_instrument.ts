import Instrument from '../../entities/instrument'
import instrumentsTableManager from '../../managers/instruments_table_manager'
import getInstument from './get_instrument'

const editInstrument = async (instrument: Instrument): Promise<Instrument> => {
  await instrumentsTableManager.edit(instrument)

  return await getInstument(instrument.figi)
}

export default editInstrument
