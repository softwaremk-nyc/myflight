import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './gql/schema';
import resolvers from './gql/resolvers';
import AvwxApi from './gql/datasources/avwx';

const app = express();
const port = 3000;
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

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Express listening on ${port} with gql on ${server.graphqlPath}`);
});
