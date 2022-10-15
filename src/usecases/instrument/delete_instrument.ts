import { INSTRUMENT_NOT_FOUND } from '../../constants/errors'
import instrumentsTableManager from '../../managers/instruments_table_manager'
import DatabaseResponse from '../../models/database_response'

const deleteInstrument = async (figi: string): Promise<DatabaseResponse> => {
  const result = await instrumentsTableManager.remove(figi)

  if (result.rowsChanged === 0) {
    throw Error(INSTRUMENT_NOT_FOUND)
  }

  return result
}

export default deleteInstrument
