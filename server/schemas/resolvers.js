const { AuthenticationError } = require("apollo-server-express");
// const Book = require("../models/books/Book");
// const User = require("../models/User");
const { User, Book, BookList, BookClub, Review } = require('../models')
const { signToken } = require("../utils/auth");
const { Types } = require('mongoose');
const { create } = require("../models/books/eBook");

const ID = Types.ObjectId
const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      const user = await User.findOne({ username })
      return user
    },
    myProfile: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const found = await User.fullProfile(user._id)
      if (!found) throw new AuthenticationError('User not found')
      return found
    },
    myLists: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const found = await User.findById(user._id).populate('lists')
      if (!found) throw new AuthenticationError('User not found')

      return found.lists
    },
    myBooks: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const found = await User.findById(user._id).populate('books')
      if (!found) throw new AuthenticationError('User not found')
      return found.books
    },
    myReviews: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const found = await User.findById(user._id).populate('reviews')
      if (!found) throw new AuthenticationError('User not found')
      return found.reviews

    },
    myClubs: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const found = await User.findById(user._id).populate('clubs')
      if (!found) throw new AuthenticationError('User not found')
      return found.clubs
    },
    getList: async (parent, { id }) => {
      const list = await BookList.findById(id).populate('creator')
      if (!list) throw new Error('List not found')
      return list
    },
    getReview: async (parent, { id }) => {
      const review = await Review.findById(id).populate('creator')
      if (!review) throw new Error('List not found')
      return review
    },
    getClub: async (parent, { id }) => {
      const list = await BookList.findById(id).populate('creator')
      if (!list) throw new Error('List not found')
      return list
    },
  },
  Mutation: {
    /** AUTH */
    addUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.dir(error)
        if (error.message.includes('validation')) {
          let message = 'Validation error';
          if (error.errors) {
            message = Object.entries(error.errors).map(([path, msg]) => msg).join('. ')
          }
          throw new AuthenticationError(message)
        } else if (error.message.includes('duplicate key')) {
          throw new AuthenticationError('User already exists')
        }
        throw new AuthenticationError('Network error')
      }
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new AuthenticationError('No user found with this email address')

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect credentials')

      const token = signToken(user);
      return { token, user };
    },
    /** BOOKS */
    saveBook: async (parent, { book }, { user }) => {
      const saved = await Book.create(book)
      const update = await User.findByIdAndUpdate(user._id, {
        $addToSet: { books: Types.ObjectId(saved._id) }
      }, { new: true })
      return saved
    },
    removeBook: async (parent, { bookId }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const removed = await User.findByIdAndUpdate(user._id, {
        $pull: { books: ID(bookId) }
      })
      if (!removed) throw new AuthenticationError('User not found')
      return true
    },
    /** LISTS */
    createList: async (parent, { list }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const created = await BookList.create({
        ...list,
        tags: list.tags.map(tag => ({ text: tag })),
        creator: ID(user._id)
      })
      if (created) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { lists: ID(created._id) }
        })
      }
      return created
    },
    /** REVIEWS */
    createReview: async (parent, { review }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const created = await Review.create({
        ...review,
        book: ID(review.book),
        creator: ID(user._id)
      })
      if (created) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { reviews: ID(created._id) }
        })
      }
      return created
    },
    /** CLUBS */
    createClub: async (parent, { club }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const created = await BookClub.create({
        ...club,
        creator: ID(user._id),
        members: [ID(user._id)]
      })
      if (created) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { clubs: ID(created._id) }
        })
        await created.populate({ path: 'creator', populate: 'clubs' })
      }
      return created
    },
  }
}

module.exports = resolvers