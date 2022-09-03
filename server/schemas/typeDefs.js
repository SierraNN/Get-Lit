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
    _id: ID
    text: String
  }
  type Comment {
    _id: ID
    text: String
    author: User
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
  input BookInfo {
    googleId: ID
    title: String
    authors: [String]
    urls: [String]
    description: String
    categories: [String]
    tags: [String]
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
    myProfile: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    saveBook(book: BookInfo): User
  }
`;

module.exports = typeDefs;
