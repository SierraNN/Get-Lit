<<<<<<< HEAD
const { Schema, model } = require('mongoose')
=======
import { Schema, model } from 'mongoose'
>>>>>>> main

const eBookSchema = new Schema({
  // attributes
}, {
  // schema options
})

const eBook = model('eBook', eBookSchema)

<<<<<<< HEAD
module.exports = eBook
=======
export default eBook
>>>>>>> main
