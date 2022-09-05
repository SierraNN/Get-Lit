const { Schema, model } = require('mongoose')

const eBookSchema = new Schema({
  // attributes
}, {
  // schema options
})

const eBook = model('eBook', eBookSchema)

module.exports = eBook
