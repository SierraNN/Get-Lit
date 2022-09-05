const User = require('./User')
const Review = require('./Review')
const Comment = require('./Comment')
const Tag = require('./Tag')
const BookRelated = require('./books')

module.exports = {
  User, Review, Comment, Tag, ...BookRelated
}