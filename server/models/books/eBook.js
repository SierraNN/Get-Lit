import { Schema, model } from 'mongoose'

const eBookSchema = new Schema({
  // attributes
}, {
  // schema options
})

const eBook = model('eBook', eBookSchema)

export default eBook