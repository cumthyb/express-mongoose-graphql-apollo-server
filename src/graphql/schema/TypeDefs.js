const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    status: Boolean!
  }

  input UserInput {
    name: String
    email: String
    password: String
    status: Boolean
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
    getUserById(id: String): User
  }

  # Mutations
  type Mutation {
    createUser(user: UserInput): User!
  }
`;

module.exports = { typeDefs };
