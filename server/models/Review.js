const { Schema } = require('mongoose')

const { CommentableSchema, CommentableModel } = require("./custom/Commentable")

const ID = Schema.Types.ObjectId

const ReviewSchema = new CommentableSchema({
  // attributes
  book: {
    type: ID,
    ref: 'Book',
    required: true
  },
  creator: {
    type: ID,
    ref: 'User',
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  suggestedBooks: {
    type: [ID],
    ref: 'Book',
  },
  rating: Number
}, {
  // schema options
})

const Review = CommentableModel('Review', ReviewSchema)

module.exports = Review