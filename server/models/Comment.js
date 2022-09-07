const { Schema } = require('mongoose')

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get(value) {
      return value ? value.toLocaleString() : null
    }
  }
}, {
  // schema options
})

module.exports = CommentSchema