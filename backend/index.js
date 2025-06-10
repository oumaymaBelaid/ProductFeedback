const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

async function startServer() {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = 4004;
  app.listen(PORT, () => {
    console.log(`Serveur GraphQL prêt sur http://localhost:${PORT}/graphql`);
  });
}

startServer();
