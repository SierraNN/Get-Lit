const { AuthenticationError, UserInputError } = require("apollo-server-express");
const { User, Book, BookList, BookClub, Review } = require('../models')
const { signToken } = require("../utils/auth");
const { Types } = require('mongoose');
const { create } = require("../models/books/eBook");
const confirmModified = require("../utils/confirmModified");

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
      const found = await User.findById(user._id).populate({ path: 'lists', populate: 'books' })
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
      const found = await Review.find({ creator: ID(user._id) }).populate('book')
      // if (!found) throw new AuthenticationError('User not found')
      return found

    },
    myClubs: async (parent, args, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const found = await User.findById(user._id).populate('clubs')
      if (!found) throw new AuthenticationError('User not found')
      return found.clubs
    },
    getBook: async (parent, { id }) => {
      const book = await Book.findOne({ googleId: id })
      if (!book) {
        return {}
      }
      await book.getReviewData()
      return book
    },
    getClub: async (parent, { id }) => {
      const club = await BookClub.findById(id).populate(['creator', 'members', 'posts.author'])
      if (!club) throw new Error('Club not found')

      return club

    },
    getList: async (parent, { id }) => {
      const list = await BookList.findById(id).populate('creator').populate('books').populate('comments.author')
      if (!list) throw new Error('List not found')

      return list
    },
    getReview: async (parent, { id }) => {
      const review = await Review.findOne({ _id: id }).populate(['book', 'comments.author', 'creator'])
      await review.getAverage()
      if (!review) throw new Error('List not found')
      return review
    },
    getUser: async (parent, { id }) => {
      if (id === 'null') throw new AuthenticationError('id required')
      const found = await User.fullProfile(id)
      if (!found) throw new AuthenticationError('User not found')
      return found
    },
    getLists: async (parent, { params = {} }) => {
      const results = await BookList.search(params)
      return results
    },
    getUsers: async (parent, { params = {} }) => {
      const results = await User.search(params)
      return results
    },
    getClubs: async (parent, { params = {} }) => {
      const results = await BookClub.search(params)
      return results
    },
    getReviews: async (parent, { params = {} }) => {
      const results = await Review.search(params)
      return results
    }
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
      if (!user) throw new AuthenticationError('Username does not exist')

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect credentials')

      const token = signToken(user);
      return { token, user };
    },

    /** PROFILE */
    updateUserTags: async (parent, { tags }, { user }) => {
      const updated = await User.findByIdAndUpdate(user._id, {
        tags: tags.map(tag => ({ text: tag }))
      }, { new: true })
      if (!user) throw new AuthenticationError('Not logged in!')
      return updated.tags
    },
    updateBio: async (parent, { bio }, { user }) => {
      const updated = await User.findByIdAndUpdate(user._id, {
        bio
      }, { new: true })
      if (!user) throw new AuthenticationError('Not logged in!')
      return bio
    },
    updateSprite: async (parent, { spriteChoice }, { user }) => {
      const updated = await User.findByIdAndUpdate(user._id, {
        spriteChoice
      }, { new: true })
      if (!user) throw new AuthenticationError('Not logged in!')
      return spriteChoice
    },
    addFollowing: async (parent, { followingId }, { user }) => {
      const update = await User.findByIdAndUpdate(user._id, {
        $addToSet: { following: Types.ObjectId(followingId) }
      }, { new: true }).then(u => u.populate('following'))
      return update.following
    },
    removeFollowing: async (parent, { followingId }, { user }) => {
      const update = await User.findByIdAndUpdate(user._id, {
        $pull: { following: Types.ObjectId(followingId) }
      }, { new: true }).then(u => u.populate('following'))
      return update.following
    },
    saveBook: async (parent, { book }, { user }) => {
      let saved = await Book.findOne({ googleId: book.googleId })
      if (!saved) saved = await Book.create(book)
      update = await User.findByIdAndUpdate(user._id, {
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
    joinClub: async (parent, { id }, { user }) => {
      let userUpdate = await User.findByIdAndUpdate(user._id, {
        $addToSet: { clubs: ID(id) }
      }, { new: true })
      if (!userUpdate) throw new AuthenticationError('User not found')
      let clubUpdate = await BookClub.findByIdAndUpdate(id, {
        $addToSet: { members: ID(user._id) }
      }, { new: true })
      if (!clubUpdate) throw new UserInputError('Club not found')

      return true
    },
    leaveClub: async (parent, { id }, { user }) => {
      let userUpdate = await User.findByIdAndUpdate(user._id, {
        $pull: { clubs: ID(id) }
      }, { new: true })
      if (!userUpdate) throw new AuthenticationError('User not found')
      let clubUpdate = await BookClub.findByIdAndUpdate(id, {
        $pull: { members: ID(user._id) }
      }, { new: true })
      if (!clubUpdate) throw new UserInputError('Club not found')
      return true
    },

    /** LISTS */
    createList: async (parent, { list }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      let book = list.book ? await Book.findOne({ googleId: list.book.googleId }) || await Book.create(list.book) : null

      const listInfo = {
        ...list,
        tags: list.tags.map(tag => ({ text: tag })),
        creator: ID(user._id),
        creator_name: user.username
      }
      if (book) listInfo.books = [book._id]
      const created = await BookList.create(listInfo).then(c => c.populate('books'))
      if (created) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { lists: ID(created._id) }
        })
      }
      return created
    },
    addBookToList: async (parent, { listId, book }, { user }) => {
      let foundBook = await Book.findOne({ googleId: book.googleId })
      if (!foundBook) foundBook = await Book.create(book)

      const list = await BookList.findOneAndUpdate({
        _id: ID(listId),
        creator: ID(user._id)
      }, {
        $addToSet: { books: Types.ObjectId(foundBook._id) }
      }, {
        new: true
      }).populate(['creator', 'books'])
      // list.populate('books')

      if (!list) throw new AuthenticationError("List not found")
      return list
    },
    removeBookFromList: async (parent, { listId, bookId }, { user }) => {
      let book = await Book.findOne({ googleId: bookId })
      if (!book) throw new UserInputError('Book not found')
      const list = await BookList.findOneAndUpdate({
        _id: ID(listId),
        creator: ID(user._id)
      }, {
        $pull: { books: ID(book._id) }
      }, {
        new: true
      }).populate(['creator', 'books'])
      if (!list) throw new AuthenticationError("List not found")
      return list
    },
    addCommentToList: async (parent, { listId, comment }, { user }) => {
      const list = await BookList.findByIdAndUpdate(listId, {
        $addToSet: { comments: { text: comment, author: ID(user._id) } }
      }, { new: true }).populate({ path: "comments", populate: "author" })

      if (!list) throw new AuthenticationError("List not found")
      return list.comments
    },
    /** REVIEWS */
    createReview: async (parent, { review }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      let book = await Book.findOne({ googleId: review.book.id })
      if (!book) book = await Book.create(review.book)
      delete review.book
      const created = await Review.create({
        ...review,
        book: ID(book._id),
        creator: ID(user._id),
        creator_name: user.username
      }).then(c => c.populate(['book', 'creator', 'comments.author']))
      if (created) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { reviews: ID(created._id) }
        })
      }
      return created
    },
    addCommentToReview: async (parent, { reviewId, comment }, { user }) => {
      const list = await Review.findByIdAndUpdate(reviewId, {
        $addToSet: { comments: { text: comment, author: ID(user._id) } }
      }, { new: true }).populate({ path: "comments", populate: "author" })

      if (!list) throw new AuthenticationError("List not found")
      return list.comments
    },
    /** CLUBS */
    createClub: async (parent, { club }, { user }) => {
      if (!user) throw new AuthenticationError('Not logged in')
      const clubInfo = {
        ...club,
        tags: club.tags.map(tag => ({ text: tag })),
        creator: ID(user._id),
        creator_name: user.username,
        members: [ID(user._id)]
      }
      const created = await BookClub.create(clubInfo)
      if (created) {
        await User.findByIdAndUpdate(user._id, {
          $addToSet: { clubs: ID(created._id) }
        })
        await created.populate({ path: 'creator', populate: 'clubs' })
      }
      return created
    },
    addPostToClub: async (parent, { clubId, post }, { user }) => {
      const club = await BookClub.findByIdAndUpdate(clubId, {
        $addToSet: { posts: { text: post, author: ID(user._id) } }
      }, { new: true }).populate({ path: "posts", populate: "author" })

      if (!club) throw new AuthenticationError("Club not found")
      return club.posts
    },
    addBookToClub: async (parent, { clubId, book }, { user }) => {
      let foundBook = await Book.findOne({ googleId: book.googleId })
      if (!foundBook) foundBook = await Book.create(book)

      const club = await BookClub.findOneAndUpdate({
        _id: ID(clubId),
        creator: ID(user._id)
      }, {
        $addToSet: { books: { book: Types.ObjectId(foundBook._id) } }
      }, {
        new: true
      }).populate(['creator', 'books.book'])
      // club.populate('books')
      console.log(club)
      if (!club) throw new AuthenticationError("Club not found")
      return club
    },
    removeBookFromClub: async (parent, { clubId, bookId }, { user }) => {
      let book = await Book.findOne({ googleId: bookId })
      if (!book) throw new UserInputError('Book not found')
      const club = await BookClub.findOneAndUpdate({
        _id: ID(clubId),
        creator: ID(user._id)
      }, {
        $pull: { books: ID(book._id) }
      }, {
        new: true
      }).populate(['creator', 'books'])
      if (!club) throw new AuthenticationError("Club not found")
      return club
    },

    /** COMMENTS / POSTS
     * Any model that has posts or comments uses the same underlying Mongoose model
     */
    editClubPost: async (parent, { clubId, commentId, text }, { user }) => {
      const update = await BookClub.updateOne({
        _id: clubId, posts: { $elemMatch: { _id: ID(commentId), author: ID(user._id) } }
      }, {
        $set: { "posts.$.text": text }
      }, { new: true }).populate({ path: "posts", populate: "author" })
      console.log(update)
      if (!update) throw new AuthenticationError("Club or post not found")
      return confirmModified(update, 1)
      // return update.acknowledged || false
    },
    removeClubPost: async (parent, { clubId, commentId }, { user }) => {
      const club = await BookClub.findByIdAndUpdate(clubId, {
        $pull: { posts: { _id: ID(commentId), author: ID(user._id) } }
      }, { new: true }).populate({ path: "posts", populate: "author" })

      if (!club) throw new AuthenticationError("Club not found")
      return club ? true : false
    },
    editListComment: async (parent, { listId, commentId, text }, { user }) => {
      const update = await BookList.updateOne({
        _id: listId, comments: { $elemMatch: { _id: ID(commentId), author: ID(user._id) } }
      }, {
        $set: { "comments.$.text": text }
      }, { new: true }).populate({ path: "comments", populate: "author" })
      if (!update) throw new AuthenticationError("List or comment not found")
      return confirmModified(update, 1)
    },
    removeListComment: async (parent, { listId, commentId }, { user }) => {
      const list = await BookList.findByIdAndUpdate(listId, {
        $pull: { comments: { _id: ID(commentId), author: ID(user._id) } }
      }, { new: true }).populate({ path: "comments", populate: "author" })

      if (!list) throw new AuthenticationError("List not found")
      return list ? true : false
    },
    editReviewComment: async (parent, { reviewId, commentId, text }, { user }) => {
      const update = await Review.updateOne({
        _id: reviewId, comments: { $elemMatch: { _id: ID(commentId), author: ID(user._id) } }
      }, {
        $set: { "comments.$.text": text }
      }, { new: true }).populate({ path: "comments", populate: "author" })
      if (!update) throw new AuthenticationError("Review or comment not found")
      return confirmModified(update, 1)
    },
    removeReviewComment: async (parent, { reviewId, commentId }, { user }) => {
      const review = await Review.findByIdAndUpdate(reviewId, {
        $pull: { comments: { _id: ID(commentId), author: ID(user._id) } }
      }, { new: true }).populate({ path: "comments", populate: "author" })

      if (!review) throw new AuthenticationError("Review not found")
      return review ? true : false
    },
  }
}

module.exports = resolvers