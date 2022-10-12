import User from "../entities/user";
import databaseManager from "./database_manager";

const tableTitle = "Users";

const createTableIfNotExists = () => {
  const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
    uuid TEXT PRIMARY KEY, 
    name TEXT, 
    surname TEXT
  )`;

  return databaseManager.runScript(script);
};

const add = (uuid: string, name?: string, surname?: string) => {
  const script = `INSERT INTO ${tableTitle} 
  (uuid, name, surname) 
  VALUES ($uuid, $name, $surname)`;

  const params = {
    $uuid: uuid,
    $name: name ?? null,
    $surname: surname ?? null,
  };

  return databaseManager.runScript(script, params);
};

const edit = (uuid: string, name?: string, surname?: string) => {
  const script = `UPDATE ${tableTitle} 
  SET name = $name, surname = $surname
  WHERE uuid = $uuid`;

  const params = {
    $uuid: uuid,
    $name: name ?? null,
    $surname: surname ?? null,
  };

  return databaseManager.runScript(script, params);
};

const get = (uuid: string) => {
  const script = `SELECT * FROM ${tableTitle} 
  WHERE uuid = $uuid`;
  const params = {
    $uuid: uuid,
  };

  return databaseManager.readFirst<User>(script, params);
};

const remove = (uuid: string) => {
  const script = `DELETE FROM ${tableTitle} 
  WHERE uuid = $uuid`;
  const params = {
    $uuid: uuid,
  };

  return databaseManager.runScript(script, params);
};

createTableIfNotExists();

const usersTableManager = {
  add,
  edit,
  get,
  remove,
};

export default usersTableManager;
