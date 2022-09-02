import { Schema, model } from 'mongoose'

const BookListSchema = new Schema({
  // attributes
}, {
  // schema options
})

const BookList = model('BookList', BookListSchema)

export default BookList