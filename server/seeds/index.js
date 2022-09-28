const path = require('path')
const { faker } = require('@faker-js/faker')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const db = require('../config/connection')
const { User } = require("../models")

async function userSeed() {
  let usernames = []
  while (usernames.length < 30) {
    let newUser = faker.internet.userName()
    if (newUser.length < 15 && !usernames.find(name => name === newUser)) usernames.push(newUser)
  }

  const clearTable = process.argv[2]
  if (clearTable && clearTable === 'true') await User.collection.drop()

  await User.collection.insertMany(usernames.map(username => ({
    username, email: username + '@example.com', password: 'password', spriteChoice: Math.floor(Math.random() * 4)
  }))).then(() => console.log('Users seeded')).catch(e => console.log(e))

  process.exit(0)
}

userSeed()