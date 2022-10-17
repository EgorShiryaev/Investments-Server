import Instrument from '../../entities/instrument';
import InstrumentTableManager from '../../managers/instrument_table_manager';
import getInstument from './get_instrument';

const editInstrument = async (instrument: Instrument) => {
  await InstrumentTableManager.edit(instrument);

  return await getInstument(instrument.figi);
};

export default editInstrument;
