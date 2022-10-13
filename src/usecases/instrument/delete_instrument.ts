import { INSTRUMENT_NOT_FOUND } from "../../constants/errors";
import instrumentsTableManager from "../../managers/instruments_table_manager";

const deleteInstrument = async (figi: string) => {
  const result = await instrumentsTableManager.remove(figi);

  if (result.rowsChanged === 0) {
    throw Error(INSTRUMENT_NOT_FOUND);
  }

  return result;
};

export default deleteInstrument;
