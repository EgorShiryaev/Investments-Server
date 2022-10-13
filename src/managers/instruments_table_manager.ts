import Instrument from "../entities/instrument";
import databaseManager from "./database_manager";

const tableTitle = "Instruments";

const createTableIfNotExists = () => {
  const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
    figi TEXT PRIMARY KEY, 
    ticker TEXT NOT NULL, 
    title TEXT NOT NULL,
    lot INT NOT NULL,
    currency TEXT NOT NULL
  )`;

  return databaseManager.runScript(script);
};

const add = (instrument: Instrument) => {
  const script = `INSERT INTO ${tableTitle} 
  (figi, ticker, title, lot, currency) 
  VALUES ($figi, $ticker, $title, $lot, $currency)`;

  const { figi, ticker, title, lot, currency } = instrument;

  const params = {
    $figi: figi,
    $ticker: ticker,
    $title: title,
    $lot: lot,
    $currency: currency,
  };

  return databaseManager.runScript(script, params);
};

const edit = (instrument: Instrument) => {
  const script = `UPDATE ${tableTitle} 
  SET ticker = $ticker, title = $title, lot = $lot, currency = $currency
  WHERE figi = $figi`;

  const { figi, ticker, title, lot, currency } = instrument;

  const params = {
    $figi: figi,
    $ticker: ticker,
    $title: title,
    $lot: lot,
    $currency: currency,
  };

  return databaseManager.runScript(script, params);
};

const get = (figi: string): Promise<Instrument | undefined> => {
  const script = `SELECT * FROM ${tableTitle} 
  WHERE figi = $figi`;

  const params = {
    $figi: figi,
  };

  return databaseManager.readFirst<Instrument>(script, params);
};

const remove = (figi: string) => {
  const script = `DELETE FROM ${tableTitle} 
   WHERE figi = $figi`;

  const params = {
    $figi: figi,
  };

  return databaseManager.runScript(script, params);
};

createTableIfNotExists();

const instrumentsTableManager = {
  add,
  edit,
  get,
  remove,
};

export default instrumentsTableManager;
