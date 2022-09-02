const { Schema, model } = require('mongoose')
const CommentSchema = require('../Comment')

class CommentableSchema extends Schema {
  constructor(definition = {}, options) {
    super({
      ...definition,
      tags: {
        type: [CommentSchema]
      }
    }, options)
  }
}

class CommentableModel extends model {
  static instanceMethods = {
    async addComment() { console.log(`addComment function not set up`) },
    async updateComment(commmentId) { console.log(`updateComment function not set up`) },
    async removeComment(commmentId) { console.log(`removeComment function not set up`) }
  }
  static staticMethods = {}

  constructor(name, schema, collection, options) {
    for (let [name, instanceMethod] of Object.entries(CommentableModel.instanceMethods)) {
      schema.methods[name] = instanceMethod
    }
    for (let [name, staticMethod] of Object.entries(CommentableModel.staticMethods)) {
      schema.methods[name] = staticMethod
    }
    super(name, schema, collection, options)
    CommentableModel.addModel(name, this)
  }
}

module.exports = { CommentableSchema, CommentableModel }