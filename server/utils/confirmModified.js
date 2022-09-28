const confirmModified = ({ acknowledged, modifiedCount }, count = 1) => {
  // console.log(acknowledged, modifiedCount, count)
  if (!acknowledged) return false
  return modifiedCount >= count
}

module.exports = confirmModified