const { Schema, model } = require('mongoose')
const TagSchema = require('../Tag')

class TaggableSchema extends Schema {
  constructor(definition = {}, options) {
    super({
      ...definition,
      tags: {
        type: [TagSchema]
      }
    }, options)
  }
}

class TaggableModel extends model {
  static models = {}
  static addModel(name, model) {
    if (!TaggableModel.models[name]) TaggableModel.models[name] = model
  }
  static getModelNames() {
    return Object.keys(TaggableModel.models)
  }
  static getModels() {
    return Object.values(TaggableModel.models)
  }

  static instanceMethods = {
    async addTag() { console.log(`addTag function not set up`) },
    async updateTag(tagId) { console.log(`updateTag function not set up`) },
    async removeTag(tagId) { console.log(`removeTag function not set up`) }
  }
  static staticMethods = {
    async findByTagId(tagId) { console.log(`function not set up`) },
    async findSameByTagText(tagText) { console.log(`function not set up`) },
    async findAllByTagText(tagText) { console.log(`function not set up`) }
  }

  constructor(name, schema, collection, options) {
    for (let [name, instanceMethod] of Object.entries(TaggableModel.instanceMethods)) {
      schema.methods[name] = instanceMethod
    }
    for (let [name, staticMethod] of Object.entries(TaggableModel.staticMethods)) {
      schema.methods[name] = staticMethod
    }
    super(name, schema, collection, options)
    TaggableModel.addModel(name, this)
  }
}

module.exports = { TaggableSchema, TaggableModel }