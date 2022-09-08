const { Schema, model } = require('mongoose')
const CommentSchema = require('../Comment')
const TagSchema = require('../Tag')
const mongoosePaginate = require('mongoose-paginate-v2')
const paginatedSearch = require('../../utils/paginatedSearch')

const ID = Schema.Types.ObjectId
const BookClubSchema = new Schema({
  // attributes
  creator: {
    type: ID,
    ref: 'User'
  },
  members: {
    type: [ID],
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  books: {
    type: [ID],
    ref: 'Book'
  },
  lists: {
    type: [ID],
    ref: 'BookList'
  },
  tags: [TagSchema],
  posts: [CommentSchema],
}, {
  // schema options
})
BookClubSchema.plugin(mongoosePaginate)
BookClubSchema.statics.search = paginatedSearch({populate:["creator","members","posts.author",]})

const BookClub = model('BookClub', BookClubSchema)

module.exports = BookClub