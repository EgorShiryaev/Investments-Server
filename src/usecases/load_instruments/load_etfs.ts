import { InstrumentStatus } from "tinkoff-invest-api/cjs/generated/instruments";
import InstrumentType from "../../models/instrument_type";
import TINKOFF_INVEST_API from "../../tinkoff_invest_api";
import { convertItemToInstrument } from "../../utils/convector_tinkoff_invest_api_types";
import createOrEditInstruments from "../instrument/create_or_edit_instruments";

const loadEtfs = () => {
  return TINKOFF_INVEST_API.instruments
    .etfs({
      instrumentStatus: InstrumentStatus.INSTRUMENT_STATUS_ALL,
    })
    .then((response) => {
      const instruments = response.instruments.map((value) =>
        convertItemToInstrument(value, InstrumentType.etf)
      );
      return createOrEditInstruments(instruments);
    })
    .catch(() => {
      console.log("Etfs loaded failure");
      return null;
    });
};

export default loadEtfs;
