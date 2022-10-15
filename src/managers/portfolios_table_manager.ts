import PortfolioItem from '../entities/portfolio_item'
import DatabaseResponse from '../models/database_response'
import databaseManager from './database_manager'

const tableTitle = 'Portfolios'

const createTableIfNotExists = async (): Promise<DatabaseResponse> => {
  const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
    userUuid TEXT NOT NULL, 
    instrumentFigi TEXT NOT NULL,
    PRIMARY KEY(userUuid, instrumentFigi),
    FOREIGN KEY (userUuid)
      REFERENCES Users (uuid) 
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (instrumentFigi)
      REFERENCES Instruments (figi) 
        ON UPDATE CASCADE
        ON DELETE CASCADE
  )`

  return await databaseManager.runScript(script)
}

const add = async (
  userUuid: string,
  instrumentFigi: string
): Promise<DatabaseResponse> => {
  const script = `INSERT INTO ${tableTitle}
    (userUuid, instrumentFigi)
    VALUES ($userUuid, $instrumentFigi)`

  const params = {
    $userUuid: userUuid,
    $instrumentFigi: instrumentFigi
  }

  return await databaseManager.runScript(script, params)
}

const get = async (userUuid: string): Promise<PortfolioItem[]> => {
  const script = `SELECT * FROM ${tableTitle}
    WHERE userUuid = $userUuid`

  const params = {
    $userUuid: userUuid
  }

  return await databaseManager.readAll<PortfolioItem>(script, params)
}

const remove = async (
  userUuid: string,
  instrumentFigi: string
): Promise<DatabaseResponse> => {
  const script = `DELETE FROM ${tableTitle}
    WHERE userUuid = $userUuid AND instrumentFigi = $instrumentFigi`

  const params = {
    $userUuid: userUuid,
    $instrumentFigi: instrumentFigi
  }

  return await databaseManager.runScript(script, params)
}

const portfoliosTableManager = { createTableIfNotExists, add, get, remove }

export default portfoliosTableManager
