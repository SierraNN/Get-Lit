const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const bcrypt = require('bcrypt');
const TagSchema = require('./Tag');
const paginatedSearch = require('../utils/paginatedSearch');

const ID = Schema.Types.ObjectId

const UserSchema = new Schema({
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
    minlength: [5, 'Password is too short'],
  },
  bio: String,
  following: {
    type: [ID],
    ref: 'User'
  },
  spriteChoice: {
    type: Number,
    get: function (value) {
      return value || 0
    }
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
}, {
  // schema options
})

UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.fullProfile = async function (userId) {
  const user = await this.findById(userId).populate('following').populate('books').populate({ path: 'lists', populate: 'books' }).populate('clubs')
  return user
}

UserSchema.plugin(mongoosePaginate)

UserSchema.statics.search = paginatedSearch({})

const User = new model('User', UserSchema)

module.exports = User