import express from 'express';
import Settings from '../settings';
import beforeStartServer from './before_start_server';
import registrationHandler from './server_method_handlers/registration_handler';

const app = express();
const jsonParser = express.json();

beforeStartServer()
	.then(() => {
		app.listen(Settings.serverPort, Settings.serverUrl, () => {
			console.log('Success start server');
		});
	})
	.catch((error) => {
		console.log('Fail start server', error);
	});

app.post('/registration', jsonParser, registrationHandler);

