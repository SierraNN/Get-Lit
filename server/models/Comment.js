const { Schema } = require('mongoose')

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  // schema options
})

module.exports = CommentSchema