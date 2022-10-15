import instrumentsTableManager from './managers/instruments_table_manager'
import usersTableManager from './managers/users_table_manager'
import portfoliosTableManager from './managers/portfolios_table_manager'
// import loadInstruments from './usecases/load_instruments/load_instruments'

const beforeStartServer = async (): Promise<void> => {
  await Promise.all([
    usersTableManager.createTableIfNotExists(),
    instrumentsTableManager.createTableIfNotExists(),
    portfoliosTableManager.createTableIfNotExists()
  ])

  // await loadInstruments()
}

export default beforeStartServer
