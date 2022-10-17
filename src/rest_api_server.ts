import express from 'express';
import startServer from './start_server';
import authHandler from './server_method_handlers/auth_handler';
import registrationHandler from './server_method_handlers/registration_handler';
import favoriteInstrumentsHandler from './server_method_handlers/favorite_instruments_handler';

const server = startServer();
const jsonParser = express.json();

server.post('/registration', jsonParser, registrationHandler);
server.post('/auth', jsonParser, authHandler);
server.get('/favoriteInstruments', favoriteInstrumentsHandler);
