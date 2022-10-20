// const User = require("../models/User")

function paginatedSearch({ defaultType = 'name', populate = [] }) {
  return async function ({ term, type = defaultType, pageSize = 20, page = 1 }) {
    let query = {}
    if (term) query[type] = term

    for (let attr in query) {
      if (['tags', 'comments'].includes(attr)) {
        let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:\\b${n}|${n}\\b))`).join('')
        query[attr] = { $elemMatch: { text: { $regex: regex, $options: 'i' } } }
      } else if (attr === 'creator') {
        console.log(attr, query[attr])
        // query[attr]= { $lookup: { from: 'users', localField: 'creator', foreignField: '_id', as: 'user' } }

        // const users = await User.find({ username: query[attr] })
        // const ids = users.map(({ _id }) => _id)
        // console.log({ ids })
      } else {
        let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:${n}|${n}))`).join('')
        query[attr] = { $regex: regex, $options: 'i' }
      }
    }

    const pages = await this.paginate(query, {
      populate,
      page: page,
      limit: pageSize
    })
    return { ...pages, pageSize, term, type }
  }
}

module.exports = paginatedSearch