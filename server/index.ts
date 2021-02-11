import express from 'express';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './gql/schema';
import AvwxApi from './gql/datasources/avwx';

const resolvers = require('./gql/resolvers');

const app = express();
const port = process.env.PORT || 3000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => (
    {
      avwxApi: new AvwxApi(),
    }
  ),
});

server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, '../client')));

// app.get('/', (_, res) => {
//   res.send('Hello World');
// });

app.listen(port, () => {
  console.log(`Express listening on ${port} with gql on ${server.graphqlPath}`);
});
