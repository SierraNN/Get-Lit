export const sanitizeHtml = (string) => {
  let scriptRegex = /(<script>.*<\/script>)/ig
  let formRegex = /(<form>.*<\/form>)/ig
  let buttonRegex = /(<button>.*<\/button>)/ig
  return string.replace(scriptRegex, '').replace(formRegex, '').replace(buttonRegex, '')
}