const mongoose = require('mongoose');

const mongoUser = 'todaysjam';
const mongoPassword = 'hr48';
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@ds031597.mlab.com:31597/mealdotnext2`;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongodb connection open'));

module.exports = db;
