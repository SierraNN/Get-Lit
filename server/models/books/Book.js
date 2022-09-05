const { Schema, model } = require('mongoose')
<<<<<<< HEAD
// const { TaggableSchema, TaggableModel } = require('../custom/Taggable')


const BookSchema = new Schema({
=======
const { TaggableSchema, TaggableModel } = require('../custom/Taggable')


const BookSchema = new TaggableSchema({
>>>>>>> main
  // attributes
  title: {
    type: String,
    required: true
  },
<<<<<<< HEAD
  googleId: {
    type: String,
    required: true
  },
  authors: { type: [String], required: true },
  urls: [String],
  description: { type: String, default: "" },
  categories: [String],
=======
  authors: { type: [String], required: true },
  urls: [String],
  description: { type: String, required: true },
  genre: String,
>>>>>>> main
  eBooks: {
    type: Schema.Types.ObjectId,
    ref: 'eBook'
  }
}, {
  // schema options
})

<<<<<<< HEAD
const Book = new model('Book', BookSchema)
=======
const Book = TaggableModel('Book', BookSchema)
>>>>>>> main

module.exports = Book