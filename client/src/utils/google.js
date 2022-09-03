const API_KEY = process.env.GOOGLE_API_KEY || 'notAkey'

export const bookSearch = async ({ term, type, pageNum = 1 }) => {
  return fetch(`/api/books/search/${type}/${term}/${pageNum}`).then(result => result.json())
}