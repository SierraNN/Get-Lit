const API_KEY = process.env.GOOGLE_API_KEY || 'notAkey'

const bookSearch = async (req, res) => {
  let url = 'https://www.googleapis.com/books/v1/volumes'
  const { type, term, size, page } = req.params

  let query = type === 'all' ? `?q=${term}` : `?q=${type}:${term}`
  query += `&key=${API_KEY}`

  if (page > 1) query += `&startIndex=${(page - 1) * size}`
  query += `&maxResults=${size}`
  url += query

  try {
    const result = await fetch(url)
    const data = await result.json()
    res.json({ data })
  } catch (error) {
    res.json({ error })
  }
}

const fetchBook = async (req, res) => {
  const { googleId } = req.params
  const url = `https://www.googleapis.com/books/v1/volumes/${googleId}?key=${API_KEY}`
  console.log({ googleId })
  try {
    const result = await fetch(url)
    const data = await result.json()
    res.json({ data })
  } catch (error) {
    res.json({ error })
  }
}

module.exports = { bookSearch, fetchBook }
