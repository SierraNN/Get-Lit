const path = require('path')
const { faker } = require('@faker-js/faker')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const db = require('../config/connection')
const { User } = require("../models")
const { Types } = require('mongoose');
const ID = Types.ObjectId

async function userSeed() {
  let usernames = []
  while (usernames.length < 30) {
    let newUser = faker.internet.userName()
    if (newUser.length < 15 && !usernames.find(name => name === newUser)) usernames.push(newUser)
  }

  const clearTable = process.argv[2]
  if (clearTable && clearTable === 'true') await User.collection.drop()

  await User.collection.insertOne({
    _id: ID('6328c22e9264851ed6a0156c'),
    username: 'david',
    email: 'david@example.com',
    password: '$2b$10$YuGq3MBkTIh3eNvMKf/4tuQq.tleh7CuBunVW6yCHB/fzqFSMpNhu',
    spriteChoice: 0
  })
  await User.collection.insertMany(usernames.map(username => ({
    username,
    email: username + '@example.com',
    // bcrypt hash for 'password'
    password: '$2b$10$YuGq3MBkTIh3eNvMKf/4tuQq.tleh7CuBunVW6yCHB/fzqFSMpNhu',
    spriteChoice: Math.floor(Math.random() * 6)
  }))).then(() => console.log('Users seeded')).catch(e => console.log(e))

  process.exit(0)
}

userSeed()