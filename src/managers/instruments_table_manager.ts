import Instrument from '../entities/instrument'
import DatabaseResponse from '../models/database_response'
import databaseManager from './database_manager'

const tableTitle = 'Instruments'

const createTableIfNotExists = async (): Promise<DatabaseResponse> => {
  const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
    figi TEXT PRIMARY KEY, 
    ticker TEXT NOT NULL, 
    title TEXT NOT NULL,
    lot INT NOT NULL,
    currency TEXT NOT NULL,
    instrumentType TEXT NOT NULL
  )`

  return await databaseManager.runScript(script)
}

const add = async (instrument: Instrument): Promise<DatabaseResponse> => {
  const script = `INSERT INTO ${tableTitle} 
  (figi, ticker, title, lot, currency, instrumentType) 
  VALUES ($figi, $ticker, $title, $lot, $currency, $instrumentType)`

  const { figi, ticker, title, lot, currency, instrumentType } = instrument

  const params = {
    $figi: figi,
    $ticker: ticker,
    $title: title,
    $lot: lot,
    $currency: currency,
    $instrumentType: instrumentType
  }

  return await databaseManager.runScript(script, params)
}

const addSeveral = async (
  instruments: Instrument[]
): Promise<DatabaseResponse> => {
  const placeholders = instruments.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')

  const values = instruments
    .map((v) => [
      v.figi,
      v.ticker,
      v.title,
      v.lot,
      v.currency,
      v.instrumentType
    ])
    .flat()

  const script = `INSERT INTO ${tableTitle} 
  (figi, ticker, title, lot, currency, instrumentType) 
  VALUES ${placeholders}`

  return await databaseManager.runScript(script, values)
}

const edit = async (instrument: Instrument): Promise<DatabaseResponse> => {
  const script = `UPDATE ${tableTitle} 
  SET ticker = $ticker, title = $title, lot = $lot, currency = $currency, instrumentType = $instrumentType
  WHERE figi = $figi`

  const { figi, ticker, title, lot, currency, instrumentType } = instrument

  const params = {
    $figi: figi,
    $ticker: ticker,
    $title: title,
    $lot: lot,
    $currency: currency,
    $instrumentType: instrumentType
  }

  return await databaseManager.runScript(script, params)
}

const get = async (figi: string): Promise<Instrument | undefined> => {
  const script = `SELECT * FROM ${tableTitle} 
  WHERE figi = $figi`

  const params = {
    $figi: figi
  }

  return await databaseManager.readFirst<Instrument>(script, params)
}

const getAll = async (): Promise<Instrument[]> => {
  const script = `SELECT * FROM ${tableTitle}
  ORDER BY 
    title ASC
  `

  return await databaseManager.readAll<Instrument>(script)
}

const getAllWhereQueryIsExists = async (
  query: string
): Promise<Instrument[]> => {
  const script = `SELECT * FROM ${tableTitle} 
  WHERE 
    ticker LIKE $query 
    OR ticker LIKE $queryUppercase
    OR ticker LIKE $queryLowercase
    OR ticker LIKE $queryUpperFirst
    OR title LIKE $query
    OR title LIKE $queryUppercase
    OR title LIKE $queryLowercase
    OR title LIKE $queryUpperFirst
  ORDER BY 
    title ASC
  `

  const params = {
    $query: `%${query}%`,
    $queryUppercase: `%${query.toUpperCase()}%`,
    $queryLowercase: `%${query.toLowerCase()}%`,
    $queryUpperFirst: `%${
      query[0].toUpperCase() + query.substring(1).toLowerCase()
    }%`
  }

  return await databaseManager.readAll<Instrument>(script, params)
}

const remove = async (figi: string): Promise<DatabaseResponse> => {
  const script = `DELETE FROM ${tableTitle} 
    WHERE figi = $figi`

  const params = {
    $figi: figi
  }

  return await databaseManager.runScript(script, params)
}

const instrumentsTableManager = {
  createTableIfNotExists,
  add,
  addSeveral,
  edit,
  get,
  getAll,
  getAllWhereQueryIsExists,
  remove
}

export default instrumentsTableManager
