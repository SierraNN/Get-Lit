import { Header, List, ListItem } from "semantic-ui-react"
import ListImage from "./ListImage"



const ListOfBookLists = ({ header, list }) => {
  return (
    <>
      <Header>{header}</Header>
      <List horizontal className="display-list lists">
        {list && list.length ? list.map((item, i) => <ListImage key={i} list={item} />) : <ListItem content="No lists" />}
      </List>
    </>
  )
}

export default ListOfBookLists 