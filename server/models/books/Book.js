const { Schema, model } = require('mongoose')
// const { TaggableSchema, TaggableModel } = require('../custom/Taggable')


const BookSchema = new Schema({
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
  description: { type: String, default: "" },
  categories: [String],
  eBooks: {
    type: Schema.Types.ObjectId,
    ref: 'eBook'
  }
}, {
  // schema options
})

const Book = new model('Book', BookSchema)

module.exports = Book