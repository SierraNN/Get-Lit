<<<<<<< HEAD
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
    defaultValue: ''
  },
  books: {
    type: [ID],
    ref: 'Book'
  },
  tags: [TagSchema],
  comments: [CommentSchema]
=======
import { Schema, model } from 'mongoose'

const BookListSchema = new Schema({
  // attributes
>>>>>>> main
}, {
  // schema options
})

const BookList = model('BookList', BookListSchema)

<<<<<<< HEAD
module.exports = BookList
=======
export default BookList
>>>>>>> main
