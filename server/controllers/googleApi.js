const { Axios } = require('axios')
const API_KEY = process.env.GOOGLE_API_KEY || 'notAkey'

const googleBooks = new Axios({
  baseURL: 'https://www.googleapis.com/books/v1',
  transformResponse: (data) => JSON.parse(data)
})

const bookSearch = async (req, res) => {
  let url = '/volumes'
  const { type, term, size, page } = req.params

  let query = type === 'all' ? `?q=${term}` : `?q=${type}:${term}`
  query += `&key=${API_KEY}`

  if (page > 1) query += `&startIndex=${(page - 1) * size}`
  query += `&maxResults=${size}`
  url += query

  try {
    const { data } = await googleBooks.get(url)
    res.json({ data })
  } catch (error) {
    console.log(error)
    res.json({ error })
  }
}

const fetchBook = async (req, res) => {
  const { googleId } = req.params
  const url = `/volumes/${googleId}?key=${API_KEY}`
  // console.log({ googleId })
  try {
    const { data } = await googleBooks.get(url)
    res.json({ data })
  } catch (error) {
    res.json({ error })
  }
}

module.exports = { bookSearch, fetchBook }
