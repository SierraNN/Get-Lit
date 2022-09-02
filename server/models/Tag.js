const { Schema } = require('mongoose')

const TagSchema = new Schema({
  text: {
    type: String,
    trim: true,
    lowercase: true
  }
}, {
  // schema options
})

module.exports = TagSchema