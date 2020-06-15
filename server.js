const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { connectToDb } = require('./server/db');

const { buildSchema } = require('graphql');
const schema = require('./server/schema/schema');
const port = parseInt(process.env.PORT, 10) || 4000;
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
  
  app.listen(port);
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
}

bootstrapServer();
