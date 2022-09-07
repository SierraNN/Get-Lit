import { Header, List, ListItem } from "semantic-ui-react"
import ListImage from "./ListImage"



const ListOfLists = ({ headerText, list }) => {
  const book = (list) => list.books[0] || {}
  return (
    <>
      <Header>{headerText}</Header>
      <List horizontal className="display-list">
        {list && list.length ? list.map((item, i) => <ListImage key={i} list={item} />) : <ListItem content="No lists" />}
      </List>
    </>
  )
}

export default ListOfLists 