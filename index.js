require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./src/graphql/schema/TypeDefs");
const { resolvers } = require("./src/graphql/schema/Resolvers");

const app = express();

// apollo config
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

const { MONGODB_URL, PORT } = process.env;

mongoose
  .connect(MONGODB_URL)
  .then((rs) => {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
      console.log(`debug your graphql service at http://localhost:${PORT}/graphql`);
    });
  })
  .catch((err) => console.log(err));
