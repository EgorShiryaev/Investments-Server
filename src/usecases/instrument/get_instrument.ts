import { INSTRUMENT_NOT_FOUND } from '../../constants/errors';
import InstrumentsTableManager from '../../managers/instruments_table_manager';

const getInstument = async (figi: string) => {
	const instrument = await InstrumentsTableManager.get(figi);

	if (instrument === undefined) {
		throw Error(INSTRUMENT_NOT_FOUND);
	}

	return instrument;
};

export default getInstument;
