const { Schema, model } = require('mongoose')
const CommentSchema = require('./Comment')
const mongoosePaginate = require('mongoose-paginate-v2')
const paginatedSearch = require('../utils/paginatedSearch')


// const { CommentableSchema, CommentableModel } = require("./custom/Commentable")

const ID = Schema.Types.ObjectId

const ReviewSchema = new Schema({
  // attributes
  book: {
    type: ID,
    ref: 'Book',
    required: true
  },
  creator: {
    type: ID,
    ref: 'User',
    required: true
  },
  creator_name: {
    type: String,
    required: true
  },
  reviewTitle: {
    type: String,
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  suggestedBooks: {
    type: [ID],
    ref: 'Book',
  },
  rating: Number,
  // averageRating: Number,
  // ratingCount: Number,
  comments: [CommentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
    get(value) {
      return value ? value.toLocaleString() : null
    }
  }
}, {
  // schema options
  methods: {
    getAverage: async function () {
      await this.book.getReviewData()
    }
  }
})

ReviewSchema.plugin(mongoosePaginate)
ReviewSchema.statics.search = paginatedSearch({ populate: ['book', 'creator', 'comments.author'] })

const Review = new model('Review', ReviewSchema)

module.exports = Review