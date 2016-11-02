const mongoose = require('mongoose');

const mongoUser = 'todaysjam';
const mongoPassword = 'hr48';
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@ds049466.mlab.com:49466/legacy`;
mongoose.connect(mongoURI);
// mongoose.connect('mongodb://localhost/legacy')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongodb connection open'));

module.exports = db;
