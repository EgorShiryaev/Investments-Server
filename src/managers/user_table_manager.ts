import User from '../entities/user';
import databaseManager from './database_manager';

export const userTableTitle = 'User';

const createTableIfNotExists = async () => {
  const script = `CREATE TABLE IF NOT EXISTS ${userTableTitle} (
    uuid TEXT PRIMARY KEY, 
    email TEXT UNIQUE, 
    password TEXT
  )`;

  return await databaseManager.runScript(script);
};

const add = async (user: User) => {
  const script = `INSERT INTO ${userTableTitle} 
  (uuid, email, password) 
  VALUES ($uuid, $email, $password)`;

  const { uuid, email, password } = user;

  const params = {
    $uuid: uuid,
    $email: email,
    $password: password,
  };

  return await databaseManager.runScript(script, params);
};

const edit = async (user: User) => {
  const script = `UPDATE ${userTableTitle} 
  SET email = $email, password = $password
  WHERE uuid = $uuid`;

  const { uuid, email, password } = user;

  const params = {
    $uuid: uuid,
    $email: email,
    $password: password,
  };

  return await databaseManager.runScript(script, params);
};

const getWhereUuid = async (uuid: string) => {
  const script = `SELECT * FROM ${userTableTitle} 
	WHERE uuid = $uuid`;

  const params = {
    $uuid: uuid,
  };

  return await databaseManager.readFirst<User>(script, params);
};

const getWhereEmail = async (email: string) => {
  const script = `SELECT * FROM ${userTableTitle} 
  WHERE email = $email`;

  const params = {
    $email: email,
  };

  return await databaseManager.readFirst<User>(script, params);
};

const getWhereEmailWithPassword = async (email: string, password: string) => {
  const script = `SELECT * FROM ${userTableTitle} 
  WHERE email = $email AND password = $password`;

  const params = {
    $email: email,
    $password: password,
  };

  return await databaseManager.readFirst<User>(script, params);
};

const remove = async (uuid: string) => {
  const script = `DELETE FROM ${userTableTitle} 
  WHERE uuid = $uuid`;

  const params = {
    $uuid: uuid,
  };

  return await databaseManager.runScript(script, params);
};

const UserTableManager = {
  createTableIfNotExists,
  add,
  edit,
  getWhereUuid,
  getWhereEmail,
  getWhereEmailWithPassword,
  remove,
};

export default UserTableManager;
