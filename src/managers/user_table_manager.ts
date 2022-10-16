import User from '../entities/user';
import databaseManager from './database_manager';

const tableTitle = 'User';

const createTableIfNotExists = async () => {
	const script = `CREATE TABLE IF NOT EXISTS ${tableTitle} (
    uuid TEXT PRIMARY KEY, 
    email TEXT UNIQUE, 
    password TEXT
  )`;

	return await databaseManager.runScript(script);
};

const add = async (user: User) => {
	const script = `INSERT INTO ${tableTitle} 
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
	const script = `UPDATE ${tableTitle} 
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

const get = async (uuid: string) => {
	const script = `SELECT * FROM ${tableTitle} 
  WHERE uuid = $uuid`;

	const params = {
		$uuid: uuid,
	};

	return await databaseManager.readFirst<User>(script, params);
};

const remove = async (uuid: string) => {
	const script = `DELETE FROM ${tableTitle} 
  WHERE uuid = $uuid`;

	const params = {
		$uuid: uuid,
	};

	return await databaseManager.runScript(script, params);
};

const UserTableManager = { createTableIfNotExists, add, edit, get, remove };

export default UserTableManager;
