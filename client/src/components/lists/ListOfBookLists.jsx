// import { Header, List, ListItem } from "semantic-ui-react"
import ListImage from "./ListImage"
import AppList from './AppList';



const ListOfBookLists = (props) => {
  // const ListOfBookLists = ({ list, header }) => {
  return <AppList {...props} className="lists" ItemComponent={ListImage} />
  // return (
  //   <>
  //     <Header>{header}</Header>
  //     <List horizontal className="display-list lists">
  //       {list && list.length ? list.map((item, i) => <ListImage key={i} list={item} />) : <ListItem content="No lists" />}
  //     </List>
  //   </>
  // )
}

export default ListOfBookLists 