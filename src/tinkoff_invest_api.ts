import { TinkoffInvestApi } from 'tinkoff-invest-api';
import Settings from '../settings';

const TINKOFF_INVEST_API = new TinkoffInvestApi({
  token: Settings.tinkoffInvestApiToken
});

export default TINKOFF_INVEST_API;
