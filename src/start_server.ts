import express from 'express';
import InstrumentTableManager from './managers/instrument_table_manager';
import UserTableManager from './managers/user_table_manager';
import Settings from '../settings';
import FavoriteInstrumentsTableManager from './managers/favorite_intruments_table_manager';
import loadInstruments from './usecases/load_instruments/load_instruments';

const beforeStartServer = async () => {
	await Promise.all([
		UserTableManager.createTableIfNotExists(),
		InstrumentTableManager.createTableIfNotExists(),
		FavoriteInstrumentsTableManager.createTableIfNotExists(),
	]);

	await loadInstruments().catch((error) =>
		console.log('start server error', error)
	);
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
