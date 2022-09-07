/** @format */

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    following: [User]
    books: [Book]
    lists: [BookList]
    reviews: [Review]
    clubs: [BookClub]
    tags: [Tag]
    spriteChoice: Int
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
    createdAt: String
    replies: [Comment]
  }

  type Book {
    _id: ID
    googleId: ID
    title: String
    authors: [String]
    thumbnail: String
    description: String
    categories: [String]
    tags: [Tag]
    ebooks: [eBook]
  }
  input BookInfo {
    googleId: ID
    title: String
    authors: [String]
    thumbnail: String
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
    book: BookInfo
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
  
  input SearchParams {
    term: String
    type: String
    pageNum: Int
    pageSize: Int
  }

  type ListResults {
    totalDocs: Int
    docs: [BookList]
    totalPages: Int
    page: Int
  }
  type ClubResults {
    totalDocs: Int
    docs: [BookClub]
    totalPages: Int
    page: Int
  }
  type UserResults {
    totalDocs: Int
    docs: [User]
    totalPages: Int
    page: Int
  }
  type ReviewResults {
    totalDocs: Int
    docs: [Review]
    totalPages: Int
    page: Int
  }

  type Query {
    user(username: String!): User
    myProfile: User
    myLists: [BookList]
    myBooks: [Book]
    myReviews: [Review]
    myClubs: [BookClub]
    getBook(id: ID!): Book
    getList(id: ID!): BookList
    getReview(id: ID!): Review
    getClub(id: ID!): BookClub
    getUser(id: ID!): User
    getLists(params: SearchParams): ListResults
    getReviews(params: SearchParams): ReviewResults
    getClubs(params: SearchParams): ClubResults
    getUsers(params: SearchParams): UserResults
  }

  type Mutation {
    # auth
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    # following
    addFollowing(followingId:ID): [User]
    removeFollowing(followingId:ID): [User]
    # books
    saveBook(book: BookInfo): Book
    removeBook(bookId: ID): Boolean
    # lists
    createList(list: CreateList): BookList
    addBookToList(listId: ID, book:BookInfo): BookList
    addCommentToList(listId: ID, comment:String): [Comment]
    # reviews
    createReview(review: CreateReview): Review
    # lists
    createClub(club: CreateClub): BookClub
  }
`;

module.exports = typeDefs;
