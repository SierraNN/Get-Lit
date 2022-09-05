const { Schema, model } = require('mongoose')

// const { CommentableSchema, CommentableModel } = require("./custom/Commentable")

const ID = Schema.Types.ObjectId

const ReviewSchema = new Schema({
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

const Review = new model('Review', ReviewSchema)

module.exports = Review