import Instrument from '../../entities/instrument';
import CreateOrEditInstrumentsResult from '../../entities/instrument_response_tinkoff_api';
import InstrumentTableManager from '../../managers/instrument_table_manager';
import editInstrument from './edit_instrument';
import getInstument from './get_instrument';

const createOrEditInstruments = async (
	instruments: Instrument[]
): Promise<CreateOrEditInstrumentsResult> => {
	const instrumentsNotExists: Instrument[] = [];

	let countUpdates = 0;

	await Promise.all(
		instruments.map(
			async (value) =>
				await getInstument(value.figi)
					.then(async (savedValue) => {
						if (
							value.figi !== savedValue.figi ||
              value.currency !== savedValue.currency ||
              value.instrumentType !== savedValue.instrumentType ||
              value.lot !== savedValue.lot ||
              value.ticker !== savedValue.ticker ||
              value.title !== savedValue.title
						) {
							countUpdates++;
							return await editInstrument(value);
						}
					})
					.catch(() => instrumentsNotExists.push(value))
		)
	);

	if (instrumentsNotExists.length > 0) {
		await InstrumentTableManager.addSeveral(instrumentsNotExists);
	}

	return {
		created: instrumentsNotExists.length,
		updated: countUpdates,
		all: instruments.length,
	};
};

export default createOrEditInstruments;
