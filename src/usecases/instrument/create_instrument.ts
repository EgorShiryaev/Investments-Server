import Instrument from '../../entities/instrument'
import instrumentsTableManager from '../../managers/instruments_table_manager'
import getInstument from './get_instrument'

const createInstrument = async (
  instrument: Instrument
): Promise<Instrument> => {
  await instrumentsTableManager.add(instrument)

  return await getInstument(instrument.figi)
}

export default createInstrument
