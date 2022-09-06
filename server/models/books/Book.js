const { Schema, model } = require('mongoose')
const TagSchema = require('../Tag')
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
  thumbnail: String,
  description: { type: String, default: "" },
  categories: [String],
  eBooks: {
    type: Schema.Types.ObjectId,
    ref: 'eBook'
  },
  tags: [TagSchema],
}, {
  // schema options
})

const Book = new model('Book', BookSchema)

module.exports = Book