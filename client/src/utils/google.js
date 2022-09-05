
export const bookSearch = async ({ term, type, pageSize = 20, pageNum = 1 }) => {
  return fetch(`/api/books/search/${type}/${term}/${pageSize}/${pageNum}`).then(result => result.json())
}
export const bookByGoogleId = async (googleId) => {
  return fetch(`/api/books/volume/${googleId}`).then(result => result.json())
}