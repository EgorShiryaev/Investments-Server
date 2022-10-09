import { TinkoffInvestApi } from "tinkoff-invest-api";
import tinkoffInvestApiOptions from "../configs/tinkoff_invest_api_options";

const TINKOFF_INVEST_API = new TinkoffInvestApi(tinkoffInvestApiOptions);

export default TINKOFF_INVEST_API;
