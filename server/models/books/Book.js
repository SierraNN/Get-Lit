const { Schema, model } = require('mongoose')
const { TaggableSchema, TaggableModel } = require('../custom/Taggable')


const BookSchema = new TaggableSchema({
  // attributes
  title: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  },
  authors: { type: [String], required: true },
  urls: [String],
  description: { type: String, required: true },
  categories: [String],
  eBooks: {
    type: Schema.Types.ObjectId,
    ref: 'eBook'
  }
}, {
  // schema options
})

const Book = new TaggableModel('Book', BookSchema)

module.exports = Book