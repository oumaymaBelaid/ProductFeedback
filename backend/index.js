const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { sequelize } = require('./models');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

async function startServer() {
  await sequelize.authenticate();
  console.log('Database connected');
  await sequelize.sync();
  console.log('Database synchronized');
  await server.start();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
