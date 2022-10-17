import express from 'express';
import InstrumentsTableManager from './managers/instruments_table_manager';
import UserTableManager from './managers/user_table_manager';
import Settings from '../settings';

const beforeStartServer = async () => {
	await Promise.all([
		UserTableManager.createTableIfNotExists(),
		InstrumentsTableManager.createTableIfNotExists(),
	]);

	// await loadInstruments();
};

const startServer = () => {
	const app = express();

	beforeStartServer()
		.then(() => {
			app.listen(Settings.serverPort, Settings.serverUrl, () => {
				console.log('Success start server');
			});
		})
		.catch((error) => {
			console.log('Fail start server', error);
		});

	return app;
};

export default startServer;