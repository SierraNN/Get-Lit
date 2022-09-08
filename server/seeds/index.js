const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const db = require('../config/connection')
const { User } = require("../models")

async function userSeed() {
  await User.collection.insertMany([
    { username: 'sally', email: 'sally@example.com', password: 'password' },
    { username: 'bill', email: 'bill@example.com', password: 'password' },
    { username: 'celia', email: 'celia@example.com', password: 'password' },
    { username: 'malik', email: 'malik@example.com', password: 'password' },
    { username: 'diane', email: 'diane@example.com', password: 'password' },
  ]).then(() => console.log('Users seeded'))
  process.exit(0)
}

userSeed()