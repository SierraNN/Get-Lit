<<<<<<< HEAD
const { Schema, model } = require('mongoose')

// const { CommentableSchema, CommentableModel } = require("./custom/Commentable")

const ID = Schema.Types.ObjectId

const ReviewSchema = new Schema({
=======
const { Schema } = require('mongoose')

const { CommentableSchema, CommentableModel } = require("./custom/Commentable")

const ID = Schema.Types.ObjectId

const ReviewSchema = new CommentableSchema({
>>>>>>> main
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

<<<<<<< HEAD
const Review = new model('Review', ReviewSchema)
=======
const Review = CommentableModel('Review', ReviewSchema)
>>>>>>> main

module.exports = Review