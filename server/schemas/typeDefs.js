const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    _id: String
  }
  type Auth {
    token: String
    user: User 
  }

  type Query {
    user(username:String!): User
  }

  type Mutation {
    addUser(username:String!,email:String!,password:String!): Auth
  }
`

module.exports = typeDefs