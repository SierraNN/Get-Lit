
export const bookSearch = async ({ term, type, pageSize = 20, page = 1 }) => {
  return fetch(`/api/books/search/${type}/${term}/${pageSize}/${page}`).then(result => result.json())
}
export const bookByGoogleId = async (googleId) => {
  return fetch(`/api/books/volume/${googleId}`).then(result => result.json())
}