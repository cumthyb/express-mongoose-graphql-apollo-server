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

mongoose
  .connect(process.env.MONGODB_URL)
  .then((rs) => {
    app.listen(process.env.PORT, () => console.log(`server started at 3001`));
  })
  .catch((err) => console.log(err));
