import Instrument from '../../entities/instrument';
import CreateOrEditInstrumentsResult from '../../entities/instrument_response_tinkoff_api';
import InstrumentTableManager from '../../managers/instrument_table_manager';
import editInstrument from './edit_instrument';
import getInstument from './get_instrument';

const equals = (savedInstrument: Instrument, instrument: Instrument) => {
  for (const key in savedInstrument) {
    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (savedInstrument[key] !== instrument[key]) {
      return false;
    }
  }
  return true;
};

const createOrEditInstruments = async (
  instruments: Instrument[]
): Promise<CreateOrEditInstrumentsResult> => {
  const instrumentsNotExists: Instrument[] = [];
  let countUpdates = 0;

  const promises = instruments.map(async (value) => {
    return getInstument(value.figi)
      .then(async (savedValue) => {
        if (!equals(savedValue, value)) {
          countUpdates++;
          await editInstrument(value);
        }
      })
      .catch(() => {
        instrumentsNotExists.push(value);
      });
  });

  await Promise.all(promises).catch((error) => console.error(error));

  if (instrumentsNotExists.length > 0) {
    await InstrumentTableManager.addSeveral(instrumentsNotExists).catch(
      (error) => console.error('addSeveral', error)
    );
  }

  return {
    created: instrumentsNotExists.length,
    updated: countUpdates,
    all: instruments.length,
  };
};

export default createOrEditInstruments;
