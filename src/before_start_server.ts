import instrumentsTableManager from './managers/instruments_table_manager';
import UserTableManager from './managers/user_table_manager';
import loadInstruments from './usecases/load_instruments/load_instruments';

const beforeStartServer = async ()=> {
	await Promise.all([
		UserTableManager.createTableIfNotExists(),
		instrumentsTableManager.createTableIfNotExists(),
	]);

	// await loadInstruments();
};

export default beforeStartServer;
