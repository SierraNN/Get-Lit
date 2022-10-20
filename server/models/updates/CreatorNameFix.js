const path = require('path')
const { faker } = require('@faker-js/faker')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
// const db = require('../config/connection')
const db = require('../../config/connection')
const { User, Review } = require("../../models")
const { Types } = require('mongoose');
const { BookList, BookClub } = require('../books')
const ID = Types.ObjectId

async function dbUpdate() {
  let update
  const lists = await BookList.find().populate('creator')
  lists.forEach((list, i) => {
    list.$set('creator_name', list.creator.username)
  })
  update = await Promise.all(lists.map((list) => list.save()))
  console.log("LIST UPDATE", update.length)
  const reviews = await Review.find().populate('creator')
  reviews.forEach((review, i) => {
    review.$set('creator_name', review.creator.username)
  })
  update = await Promise.all(reviews.map((review) => review.save()))
  console.log("REVIEW UPDATE", update.length)
  const clubs = await BookClub.find().populate('creator')
  clubs.forEach((club, i) => {
    club.$set('creator_name', club.creator.username)
  })
  update = await Promise.all(clubs.map((club) => club.save()))
  console.log("CLUB UPDATE", update.length)

  process.exit(0)
}

dbUpdate()