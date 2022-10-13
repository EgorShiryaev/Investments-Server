import Instrument from "../../entities/instrument";
import instrumentsTableManager from "../../managers/instruments_table_manager";
import getInstument from "./get_instrument";

const editInstrument = async (instrument: Instrument) => {
  await instrumentsTableManager.edit(instrument);

  return getInstument(instrument.figi);
};

export default editInstrument;
