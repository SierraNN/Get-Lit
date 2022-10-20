import { Header, List, ListItem } from "semantic-ui-react"
import ClubImage from "./ClubImage"
import ListHeader from "./AppHeader"
import AppList from "./AppList"



const ClubList = (props) => {
  return <AppList {...props} className="clubs" ItemComponent={ClubImage} />
}

export default ClubList