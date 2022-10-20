import { Header } from "semantic-ui-react"

const AppHeader = ({ content, as = 'h3', withNav = false }) => {
  if (typeof content === 'string') {
    return <Header as={as} content={content} />
  } else {
    return content
  }
}

export default AppHeader