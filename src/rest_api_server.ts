import express from 'express';
import authHandler from './server_method_handlers/auth_handler';
import registrationHandler from './server_method_handlers/registration_handler';
import favoriteInstrumentsHandler from './server_method_handlers/favorite_instruments_handler';
import addFavoriteInstrumentsHandler from './server_method_handlers/add_favorite_instruments_handler';
import deleteFavoriteInstrumentsHandler from './server_method_handlers/delete_favorite_instruments_handler';
import searchInstrumentsHandler from './server_method_handlers/search_instruments_handler';
import UserTableManager from './managers/user_table_manager';
import InstrumentTableManager from './managers/instrument_table_manager';
import FavoriteInstrumentsTableManager from './managers/favorite_intruments_table_manager';
import loadInstruments from './usecases/load_instruments/load_instruments';
import Settings from '../settings';

const createTables = () => {
  return Promise.all([
    UserTableManager.createTableIfNotExists(),
    InstrumentTableManager.createTableIfNotExists(),
    FavoriteInstrumentsTableManager.createTableIfNotExists(),
  ]);
};

const initServer = () => {
  const app = express();

  createTables()
    .then(loadInstruments)
    .then(() => app.listen(Settings.serverPort, Settings.serverUrl))
    .then(() => {
      console.log('Success start server');
      console.log(`${Settings.serverUrl}:${Settings.serverPort}`);
    })
    .catch((error) => {
      console.log('Fail start server', error);
    });

  return app;
};

const server = initServer();
const jsonParser = express.json();

server.post('/registration', jsonParser, registrationHandler);
server.post('/auth', jsonParser, authHandler);

const favoriteInstrumentsPath = '/favoriteInstruments';
server.get(favoriteInstrumentsPath, favoriteInstrumentsHandler);
server.post(favoriteInstrumentsPath, jsonParser, addFavoriteInstrumentsHandler);
server.delete(
  favoriteInstrumentsPath,
  jsonParser,
  deleteFavoriteInstrumentsHandler
);

server.get('/instruments', searchInstrumentsHandler);
