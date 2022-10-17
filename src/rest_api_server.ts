import express from 'express';
import startServer from './start_server';
import authHandler from './server_method_handlers/auth_handler';
import registrationHandler from './server_method_handlers/registration_handler';
import getPortfolioHandler from './server_method_handlers/get_portfolio_handler';

const server = startServer();
const jsonParser = express.json();

server.post('/registration', jsonParser, registrationHandler);
server.post('/auth', jsonParser, authHandler);
server.get('/portfolio', getPortfolioHandler);
