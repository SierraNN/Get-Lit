const { Schema, model } = require('mongoose')
const Review = require('../Review')
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
  averageRating: Number,
  ratingCount: Number,
  eBooks: {
    type: Schema.Types.ObjectId,
    ref: 'eBook'
  },
  tags: [TagSchema],
}, {
  // schema options
  methods: {
    getReviewData: async function () {
      let result = await Review.aggregate(
        [
          { $match: { book: this._id } },
          {
            $group: {
              _id: null,
              averageRating: { $avg: '$rating' },
              ratingCount: { $count: {} }
            }
          }
        ]
      ).then(groups => groups[0])
      if (result) {
        let { averageRating, ratingCount } = result
        this.set({ averageRating, ratingCount })
      }

    }
  }
})

const Book = new model('Book', BookSchema)

module.exports = Book