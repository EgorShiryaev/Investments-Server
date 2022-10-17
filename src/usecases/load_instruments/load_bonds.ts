import { InstrumentStatus } from 'tinkoff-invest-api/cjs/generated/instruments';
import InstrumentType from '../../entities/instrument_type';
import TINKOFF_INVEST_API from '../../tinkoff_invest_api';
import { convertItemToInstrument } from '../../utils/convector_tinkoff_invest_api_types';
import createOrEditInstruments from '../instrument/create_or_edit_instruments';

const loadBonds = async () => {
  const bonds = await TINKOFF_INVEST_API.instruments
    .bonds({
      instrumentStatus: InstrumentStatus.INSTRUMENT_STATUS_ALL,
    })
    .then(async (response) => {
      return response.instruments.map((value) =>
        convertItemToInstrument(value, InstrumentType.bond)
      );
    });
    

  return createOrEditInstruments(bonds);
};

export default loadBonds;
