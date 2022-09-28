export const sanitizeHtml = (string) => {
  let scriptRegex = /(<script>.*<\/script>)/ig
  return string.replace(scriptRegex, '')
}