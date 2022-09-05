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
<<<<<<< HEAD
    _id: ID
    text: String
  }
  type Comment {
    _id: ID
    text: String
    author: User
=======
    text: String
  }
  type Comment {
    text: String
    author: ID
>>>>>>> main
    replies: [Comment]
  }

  type Book {
    _id: ID
<<<<<<< HEAD
    googleId: ID
=======
>>>>>>> main
    title: String
    authors: [String]
    urls: [String]
    description: String
<<<<<<< HEAD
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

=======
    genre: String
    tags: [Tag]
    ebooks: [eBook]
  }
>>>>>>> main
  type eBook {
    book: Book
    link: String
    free: Boolean
  }
  type Review {
<<<<<<< HEAD
    _id: ID
=======
>>>>>>> main
    book: Book
    creator: User
    reviewText: String
    suggestedBooks: [Book]
    suggestedTags: [Tag]
    rating: Int
    comments: [Comment]
  }
<<<<<<< HEAD
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
=======
  type BookList {
    description: String
    tags: [Tag]
    books: [ID]
    creator: User
    comments: [Comment]
  }
  type BookClub {
>>>>>>> main
    description: String
    tags: [Tag]
    books: [Book]
    lists: [BookList]
<<<<<<< HEAD
    posts: [Comment]
  }
  input CreateClub {
    name: String
    description: String
=======
    creator: User
    comments: [Comment]
>>>>>>> main
  }

  type Query {
    user(username: String!): User
<<<<<<< HEAD
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
=======
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
>>>>>>> main
  }
`;

module.exports = typeDefs;
