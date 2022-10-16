import sqlite3 from 'sqlite3';
import Settings from '../settings';

const sqlite = sqlite3.verbose();

const DATABASE = new sqlite.Database(Settings.databasePath);

export default DATABASE;
