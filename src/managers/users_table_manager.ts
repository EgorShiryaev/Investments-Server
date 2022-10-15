import User from '../entities/user'
import DatabaseResponse from '../models/database_response'
import databaseManager from './database_manager'

const tableTitle = 'Users'

const createTableIfNotExists = async (): Promise<DatabaseResponse> => {
  const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
    uuid TEXT PRIMARY KEY, 
    name TEXT, 
    surname TEXT
  )`

  return await databaseManager.runScript(script)
}

const add = async (user: User): Promise<DatabaseResponse> => {
  const script = `INSERT INTO ${tableTitle} 
  (uuid, name, surname) 
  VALUES ($uuid, $name, $surname)`

  const { uuid, name, surname } = user

  const params = {
    $uuid: uuid,
    $name: name ?? null,
    $surname: surname ?? null
  }

  return await databaseManager.runScript(script, params)
}

const edit = async (user: User): Promise<DatabaseResponse> => {
  const script = `UPDATE ${tableTitle} 
  SET name = $name, surname = $surname
  WHERE uuid = $uuid`

  const { uuid, name, surname } = user

  const params = {
    $uuid: uuid,
    $name: name ?? null,
    $surname: surname ?? null
  }

  return await databaseManager.runScript(script, params)
}

const get = async (uuid: string): Promise<User | undefined> => {
  const script = `SELECT * FROM ${tableTitle} 
  WHERE uuid = $uuid`

  const params = {
    $uuid: uuid
  }

  return await databaseManager.readFirst<User>(script, params)
}

const remove = async (uuid: string): Promise<DatabaseResponse> => {
  const script = `DELETE FROM ${tableTitle} 
  WHERE uuid = $uuid`

  const params = {
    $uuid: uuid
  }

  return await databaseManager.runScript(script, params)
}

const usersTableManager = { createTableIfNotExists, add, edit, get, remove }

export default usersTableManager
