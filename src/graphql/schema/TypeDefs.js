const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    status: Boolean!
  }

  type HSBasic {
    ts_code: String
    symbol: String
    name: String
    area: String
    industry: String
    fullname: String
    enname: String
    cnspell: String
    market: String
    exchange: String
    curr_type: String
    list_status: String
    list_date: String
    delist_date: String
    is_hs: String
  }

  input UserInput {
    lastName: String
    name: String
    email: String
    password: String
    status: Boolean
  }

  input HSBasicInput {
    ts_code: String
    name: String
    area: String
    industry: String
    fullname: String
    enname: String
    cnspell: String
    market: String
    exchange: String
    curr_type: String
    list_status: String
    list_date: String
    delist_date: String
    is_hs: String
  }

  # Queries
  type Query {
    getAllUsers: [User!]!
    getUserById(id: String): User
    getHSBasic(field: String, value: String): [HSBasic!]!
  }

  # Mutations
  type Mutation {
    createUser(user: UserInput): User!
    createHSBasic(hsbasic: HSBasicInput): HSBasic
  }
`;

module.exports = { typeDefs };
