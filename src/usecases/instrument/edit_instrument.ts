import Instrument from '../../entities/instrument';
import InstrumentsTableManager from '../../managers/instruments_table_manager';
import getInstument from './get_instrument';

const editInstrument = async (instrument: Instrument) => {
	await InstrumentsTableManager.edit(instrument);

	return await getInstument(instrument.figi);
};

export default editInstrument;
