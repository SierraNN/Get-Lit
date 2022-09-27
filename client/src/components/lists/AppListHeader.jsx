import { Header } from "semantic-ui-react"

const AppListHeader = ({ header }) => {
  if (typeof header === 'string') {
    return <Header as='h3' content={header} />
  } else {
    return header
  }
}

export default AppListHeader