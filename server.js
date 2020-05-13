const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { connectToDb } = require('./server/db');

const { buildSchema } = require('graphql');
const schema = require('./server/schema/schema');

const bootstrapServer = async () => {
  connectToDb();
  
  const app = express();
  
  const corsOptions = {
    origin: 'http://localhost:3000'
  };
  app.use(cors(corsOptions))

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
  
  app.listen(4000);
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
}

bootstrapServer();
