const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const TagSchema = require('../Tag')
const CommentSchema = require('../Comment')
const paginatedSearch = require('../../utils/paginatedSearch')

const ID = Schema.Types.ObjectId
const BookListSchema = new Schema({
  // attributes
  creator: {
    type: ID,
    ref: 'User'
  },
  creator_name: {
    type: String,
    required: true
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
}, {
  // schema options
})

BookListSchema.plugin(mongoosePaginate)

BookListSchema.statics.search = paginatedSearch({ populate: ['books', 'creator'] })

const BookList = model('BookList', BookListSchema)

module.exports = BookList