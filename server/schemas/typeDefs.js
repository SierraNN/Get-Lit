/** @format */

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    books: [Book]
    lists: [BookList]
    reviews: [Review]
    clubs: [BookClub]
    tags: [Tag]
  }
  type Auth {
    token: String
    user: User
  }
  type Tag {
    text: String
  }
  type Comment {
    text: String
    author: ID
    replies: [Comment]
  }

  type Book {
    _id: ID
    title: String
    authors: [String]
    urls: [String]
    description: String
    genre: String
    tags: [Tag]
    ebooks: [eBook]
  }
  type eBook {
    book: Book
    link: String
    free: Boolean
  }
  type Review {
    book: Book
    creator: User
    reviewText: String
    suggestedBooks: [Book]
    suggestedTags: [Tag]
    rating: Int
    comments: [Comment]
  }
  type BookList {
    description: String
    tags: [Tag]
    books: [ID]
    creator: User
    comments: [Comment]
  }
  type BookClub {
    description: String
    tags: [Tag]
    books: [Book]
    lists: [BookList]
    creator: User
    comments: [Comment]
  }

  type Query {
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
