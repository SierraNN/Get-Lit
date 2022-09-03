const { AuthenticationError } = require("apollo-server-express");
const Book = require("../models/books/Book");
const User = require("../models/User");
const { signToken } = require("../utils/auth");
const { Types } = require('mongoose')

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      const user = await User.findOne({ username })
      return user
    },
    myProfile: async (parent, args, { user }) => {
      const found = await User.fullProfile(user._id)
      if (!found) throw new AuthenticationError('User not found')
      return found
    },
  },
  Mutation: {
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
    saveBook: async (parent, { book }, { user }) => {
      const saved = await Book.create(book)
      const update = await User.findByIdAndUpdate(user._id, {
        $addToSet: { books: Types.ObjectId(saved._id) }
      }, { new: true })
      return update
    }
  }
}

module.exports = resolvers