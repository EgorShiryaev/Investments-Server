import { INSTRUMENT_NOT_FOUND } from '../../constants/errors';
import InstrumentTableManager from '../../managers/instrument_table_manager';

const getInstument = async (figi: string) => {
  const instrument = await InstrumentTableManager.get(figi);

  if (instrument === undefined) {
    throw Error(INSTRUMENT_NOT_FOUND);
  }

  return instrument;
};

export default getInstument;
