require('dotenv').config();

const mongoose = require('mongoose');
const models = require('../models');

const connectToDb = () => {
  const username = process.env.MongoDBUsername;
  const password = process.env.MongoDBPassword;
  const dbUrl = process.env.MongoDBUrl;

  const URI = `mongodb+srv://${username}:${password}@${dbUrl}/test?retryWrites=true&w=majority`;
  mongoose.connect(URI, {useNewUrlParser: true});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('\n\nSuccessfully connected!\n\n');
  });
}

const disconnectFromDb = () => {
  mongoose.disconnect();
}

module.exports = {
  connectToDb,
  disconnectFromDb
}
