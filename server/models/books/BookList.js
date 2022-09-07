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

BookListSchema.statics.search = async function ({ term, type = 'name', pageSize = 20, pageNum = 1 }) {
  let query = {}
  if (term) query[type] = term

  let limit = pageSize, skip = (pageNum - 1) * pageSize

  for (let attr in query) {
    if (['name', 'description'].includes(attr)) {
      let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:\\b${n}|${n}\\b))`).join('')
      query[attr] = { $regex: regex, $options: 'i' }
    } else if (['tags', 'comments'].includes(attr)) {
      let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:\\b${n}|${n}\\b))`).join('')
      query[attr] = { $elemMatch: { text: { $regex: regex, $options: 'i' } } }
    }
  }

  // console.log(query)
  // const found = await this.aggregate([
  //   { $match: query },
  //   { $count: "totalItems" },

  // ])

  const found = await this.find(query)
    // .skip(skip).limit(limit)
    .populate('books')
    .populate('creator')
  return found
}

const BookList = model('BookList', BookListSchema)

module.exports = BookList