import express from 'express';
import InstrumentTableManager from './managers/instrument_table_manager';
import UserTableManager from './managers/user_table_manager';
import Settings from '../settings';
import PortfolioTableManager from './managers/portfolio_table_manager';

const beforeStartServer = async () => {
	await Promise.all([
		UserTableManager.createTableIfNotExists(),
		InstrumentTableManager.createTableIfNotExists(),
		PortfolioTableManager.createTableIfNotExists(),
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
