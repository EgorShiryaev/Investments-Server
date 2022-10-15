import Instrument from '../../entities/instrument'
import instrumentsTableManager from '../../managers/instruments_table_manager'

const getAllInstruments = async (): Promise<Instrument[]> => {
  return await instrumentsTableManager.getAll()
}

export default getAllInstruments
