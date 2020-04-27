const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const models = require('./server/models');

const schema = require('./server/schema/schema');

const bootstrapServer = async () => {
  
  const URI = 'mongodb+srv://francis:0dR8iSM2rabGAPbJ@homeworkouts-ddrww.mongodb.net/test?retryWrites=true&w=majority';
  mongoose.connect(URI, {useNewUrlParser: true});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('We are connected')
  });
  
  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
  
  app.listen(4000);
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
}

bootstrapServer();
