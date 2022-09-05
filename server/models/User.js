const { Schema, model } = require('mongoose')
<<<<<<< HEAD
// const { TaggableSchema, TaggableModel } = require('./custom/Taggable')
const bcrypt = require('bcrypt');
const TagSchema = require('./Tag');

const ID = Schema.Types.ObjectId

const UserSchema = new Schema({
=======
const { TaggableSchema, TaggableModel } = require('./custom/Taggable')
const bcrypt = require('bcrypt')

const UserSchema = new TaggableSchema({
>>>>>>> main
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
<<<<<<< HEAD
    minlength: [5, 'Password is too short'],
  },
  books: {
    type: [ID],
    ref: 'Book'
  },
  clubs: {
    type: [ID],
    ref: 'BookClub'
  },
  lists: {
    type: [ID],
    ref: 'BookList'
  },
  reviews: {
    type: [ID],
    ref: 'Review'
  },
  tags: [TagSchema]
=======
    minlength: 5,
  },
>>>>>>> main
}, {
  // schema options
})

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
<<<<<<< HEAD
=======

>>>>>>> main
  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

<<<<<<< HEAD
UserSchema.statics.fullProfile = async function (userId) {
  const user = await this.findById(userId).populate('books').populate('lists').populate('clubs')
  return user
}

const User = new model('User', UserSchema)
=======

const User = new TaggableModel('User', UserSchema)
>>>>>>> main

module.exports = User