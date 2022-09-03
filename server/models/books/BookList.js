const { Schema, model } = require('mongoose')
const TagSchema = require('../Tag')
const CommentSchema = require('../Comment')

const ID = Schema.Types.ObjectId
const BookListSchema = new Schema({
  // attributes
  creator: {
    type: ID,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  books: {
    type: [ID],
    ref: 'Book'
  },
  tags: [TagSchema],
  comments: [CommentSchema]
}, {
  // schema options
})

const BookList = model('BookList', BookListSchema)

module.exports = BookList