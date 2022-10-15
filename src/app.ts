import express from 'express'
import { WebSocketServer } from 'ws'
import Settings from '../settings'
import beforeStartServer from './before_start_server'
import {
  INSTRUMENTS_PATH,
  SEARCH_INSTRUMENT_PATH,
  USER_PATH
} from './constants/method_paths'
import getInstrumentsHandler from './handlers/instrument/get_instruments_handler'
import getSearchInstrumentHandler from './handlers/instrument/get_search_instrument_handler'
import deleteUserHandler from './handlers/user/delete_user_handler'
import getUserHandler from './handlers/user/get_user_handler'
import postUserHandler from './handlers/user/post_user_handler'
import putUserHandler from './handlers/user/put_user_handler'
import webSocketQuantitionsHandler from './handlers/web_socket_quotations_handler'

const app = express()
const jsonParser = express.json()

beforeStartServer()
  .then(() => {
    app.listen(Settings.serverPort, Settings.serverUrl, () => {
      console.log('Success start server')
    })
  })
  .catch(() => {})

app.get(USER_PATH, getUserHandler)
app.post(USER_PATH, jsonParser, postUserHandler)
app.put(USER_PATH, jsonParser, putUserHandler)
app.delete(USER_PATH, deleteUserHandler)

app.get(INSTRUMENTS_PATH, getInstrumentsHandler)

app.get(SEARCH_INSTRUMENT_PATH, getSearchInstrumentHandler)

const WebSocketServerInstance = new WebSocketServer({
  port: 8000,
  host: `${Settings.serverUrl}`,
  path: '/quotations'
})

WebSocketServerInstance.on('connection', webSocketQuantitionsHandler)
