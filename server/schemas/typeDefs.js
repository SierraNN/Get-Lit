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
    googleId: ID
    title: String
    authors: [String]
    urls: [String]
    description: String
    categories: [String]
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
    _id: ID
    book: Book
    creator: User
    reviewText: String
    suggestedBooks: [Book]
    suggestedTags: [Tag]
    rating: Int
    comments: [Comment]
  }
  input CreateReview {
    book: ID
    reviewText: String
    suggestedBooks: [ID]
    suggestedTags: [String]
    rating: Int
  }
  type BookList {
    _id: ID
    creator: User
    name: String
    description: String
    books: [Book]
    tags: [Tag]
    comments: [Comment]
  }
  input CreateList {
    name: String
    description: String
    tags: [String]
  }
  type BookClub {
    _id: ID
    creator: User
    members: [User]
    name: String
    description: String
    tags: [Tag]
    books: [Book]
    lists: [BookList]
    posts: [Comment]
  }
  input CreateClub {
    name: String
    description: String
  }

  type Query {
    user(username: String!): User
    myProfile: User
    myLists: [BookList]
    myBooks: [Book]
    myReviews: [Review]
    myClubs: [BookClub]
    getList(id: ID!): BookList
    getReview(id: ID!): Review
    getClub(id: ID!): BookClub
  }

  type Mutation {
    # auth
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    # books
    saveBook(book: BookInfo): Book
    removeBook(bookId: ID): Boolean
    # lists
    createList(list: CreateList): BookList
    # reviews
    createReview(review: CreateReview): Review
    # lists
    createClub(club: CreateClub): BookClub
  }
`;

module.exports = typeDefs;
