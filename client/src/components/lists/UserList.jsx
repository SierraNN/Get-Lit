import { Header, List, ListItem } from "semantic-ui-react"
import UserImage from "./UserImage"



const UserList = ({ header, list }) => {
  return (
    <>
      {header}
      <List horizontal className="display-list users">
        {list && list.length ? list.map((item, i) => <UserImage key={i} user={item} />) : <ListItem content="No users" />}
      </List>
    </>
  )
}

export default UserList 