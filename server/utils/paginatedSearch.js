function paginatedSearch({ defaultType = 'name', populate = [] }) {
  return async function ({ term, type = defaultType, pageSize = 20, pageNum = 1 }) {
    let query = {}
    if (term) query[type] = term

    for (let attr in query) {
      if (['tags', 'comments'].includes(attr)) {
        let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:\\b${n}|${n}\\b))`).join('')
        query[attr] = { $elemMatch: { text: { $regex: regex, $options: 'i' } } }
      } else {
        let regex = query[attr].trim().split(' ').map((n) => `(?=.*(?:${n}|${n}))`).join('')
        query[attr] = { $regex: regex, $options: 'i' }
      }
    }

    const pages = await this.paginate(query, {
      populate,
      page: pageNum,
      limit: pageSize
    })
    return { ...pages, pageSize }
  }
}

module.exports = paginatedSearch