const bookData = (googleData) => {
  const { title, authors, categories = [], description = "", imageLinks = {} } = googleData.volumeInfo
  let { thumbnail } = imageLinks
  return {
    googleId: googleData.id,
    title,
    authors,
    categories,
    description,
    thumbnail
  }
}

module.exports = bookData