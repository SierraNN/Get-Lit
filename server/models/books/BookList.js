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
}, {
  // schema options
})

BookListSchema.statics.search = async function (params = {}) {
  const query = { ...params }
  for (let attr in query) {
    if (['name', 'description'].includes(attr)) {
      let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:\\b${n}|${n}\\b))`).join('')
      query[attr] = { $regex: regex, $options: 'i' }
    } else if (['tags', 'comments'].includes(attr)) {
      let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:\\b${n}|${n}\\b))`).join('')
      query[attr] = { $elemMatch: { text: { $regex: regex, $options: 'i' } } }
    }
  }
  const found = await this.find(query)
    .populate('books')
    .populate('creator')
  return found
}

const BookList = model('BookList', BookListSchema)

module.exports = BookList