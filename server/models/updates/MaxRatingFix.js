const path = require('path')
const { faker } = require('@faker-js/faker')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
// const db = require('../config/connection')
const db = require('../../config/connection')
const { Review } = require("../../models")
const { Types } = require('mongoose');
// const { BookList, BookClub } = require('../books')
const ID = Types.ObjectId

async function dbUpdate() {
  let ratingTooHigh = await Review.updateMany({
    rating: { $gt: 5 }
  }, {
    $set: { rating: 5 }
  })
  console.log(ratingTooHigh)
  console.log('RATINGS FIXED', ratingTooHigh.modifiedCount)

  process.exit(0)
}

dbUpdate()