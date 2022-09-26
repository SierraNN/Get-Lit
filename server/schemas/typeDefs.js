/** @format */

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    bio: String
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
    reviewTitle: String
    reviewText: String
    suggestedBooks: [Book]
    suggestedTags: [Tag]
    rating: Int
    comments: [Comment]
    createdAt: String
  }
  input CreateReview {
    book: BookInfo
    reviewTitle: String
    reviewText: String
    rating: Float
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
    tags: [String]
  }

  input SearchParams {
    term: String
    type: String
    page: Int
    pageSize: Int
  }

  type ListResults {
    totalDocs: Int
    docs: [BookList]
    totalPages: Int
    page: Int
    pageSize: Int
  }
  type ClubResults {
    totalDocs: Int
    docs: [BookClub]
    totalPages: Int
    page: Int
    pageSize: Int
  }
  type UserResults {
    totalDocs: Int
    docs: [User]
    totalPages: Int
    page: Int
    pageSize: Int
  }
  type ReviewResults {
    totalDocs: Int
    docs: [Review]
    totalPages: Int
    page: Int
    pageSize: Int
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
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    # PROFILE
    updateUserTags(tags: [String]): [Tag]
    updateBio(bio: String): String
    updateSprite(spriteChoice: Int): Int
    addFollowing(followingId: ID): [User]
    removeFollowing(followingId: ID): [User]
    saveBook(book: BookInfo): Book
    removeBook(bookId: ID): Boolean
    joinClub(id: ID): Boolean
    leaveClub(id: ID): Boolean

    # following
    # lists
    createList(list: CreateList): BookList
    addBookToList(listId: ID, book: BookInfo): BookList
    addCommentToList(listId: ID, comment: String): [Comment]
    # reviews
    createReview(review: CreateReview): Review
    addCommentToReview(reviewId: ID, comment: String): [Comment]
    # clubs
    createClub(club: CreateClub): BookClub
    addPostToClub(clubId: ID, post: String): [Comment]
    # COMMENTS / POSTS
    editClubPost(clubId: ID, postId: ID, text: String): Boolean
    removeClubPost(clubId: ID, postId: ID): Boolean
  }
`;

module.exports = typeDefs;
