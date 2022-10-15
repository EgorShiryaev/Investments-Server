import { InstrumentStatus } from 'tinkoff-invest-api/cjs/generated/instruments'
import CreateOrEditInstrumentsResult from '../../models/instrument_response_tinkoff_api'
import InstrumentType from '../../models/instrument_type'
import TINKOFF_INVEST_API from '../../tinkoff_invest_api'
import { convertItemToInstrument } from '../../utils/convector_tinkoff_invest_api_types'
import createOrEditInstruments from '../instrument/create_or_edit_instruments'

const loadEtfs = async (): Promise<CreateOrEditInstrumentsResult> => {
  return await TINKOFF_INVEST_API.instruments
    .etfs({
      instrumentStatus: InstrumentStatus.INSTRUMENT_STATUS_ALL
    })
    .then(async (response) => {
      const instruments = response.instruments.map((value) =>
        convertItemToInstrument(value, InstrumentType.etf)
      )
      return await createOrEditInstruments(instruments)
    })
}

export default loadEtfs
