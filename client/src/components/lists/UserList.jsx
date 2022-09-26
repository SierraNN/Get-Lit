import AppList from "./AppList"
import UserImage from "./UserImage"

const UserList = (props) => {
  return <AppList {...props} className="users" ItemComponent={UserImage} />
}

export default UserList 