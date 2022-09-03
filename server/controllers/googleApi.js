const API_KEY = process.env.GOOGLE_API_KEY || 'notAkey'

const bookSearch = async (req, res) => {
  let url = 'https://www.googleapis.com/books/v1/volumes'
  const { type, term, page } = req.params

  // Building query string
  let query = type === 'all' ? `?q=${term}` : `?q=${type}:${term}`
  query += `&key=${API_KEY}`
  // If not first page
  if (page > 1) query += `&startIndex=${(page - 1) * 10}`
  url += query
  try {
    const result = await fetch(url)
    const data = await result.json()
    res.json({ data })
  } catch (error) {
    res.json({ error })
  }
}

module.exports = { bookSearch }