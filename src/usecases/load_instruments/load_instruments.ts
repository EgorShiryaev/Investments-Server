import CreateOrEditInstrumentsResult from '../../entities/instrument_response_tinkoff_api';
import loadBonds from './load_bonds';
import loadCurrencies from './load_currency';
import loadEtfs from './load_etfs';
import loadFutures from './load_futures';
import loadShares from './load_shares';

const getGeneralResult = (results: CreateOrEditInstrumentsResult[]) => {
  const initial = {
    created: 0,
    updated: 0,
    all: 0,
  };

  return results.reduce((prev, current) => {
    prev.created += current.created;
    prev.updated += current.updated;
    prev.all += current.all;

    return prev;
  }, initial);
};

const load = () => {
  return Promise.all([
    loadShares(),
    loadBonds(),
    loadEtfs(),
    loadFutures(),
    loadCurrencies(),
  ]);
};

const loadInstruments = async () => {
  let results;
  try {
    results = await load();
  } catch (error) {
    results = await load();
  }

  const generalResult = getGeneralResult(results);

  console.log('load result', generalResult);
};

export default loadInstruments;
