import { InstrumentStatus } from "tinkoff-invest-api/cjs/generated/instruments";
import InstrumentType from "../../models/instrument_type";
import TINKOFF_INVEST_API from "../../tinkoff_invest_api";
import { convertItemToInstrument } from "../../utils/convector_tinkoff_invest_api_types";
import createOrEditInstruments from "../instrument/create_or_edit_instruments";

const loadBonds = () => {
  return TINKOFF_INVEST_API.instruments
    .bonds({
      instrumentStatus: InstrumentStatus.INSTRUMENT_STATUS_ALL,
    })
    .then((response) => {
      const instruments = response.instruments.map((value) =>
        convertItemToInstrument(value, InstrumentType.bond)
      );
      return createOrEditInstruments(instruments);
    })
    .catch(() => {
      console.log("Bonds loaded failure");
      return null;
    });
};

export default loadBonds;
