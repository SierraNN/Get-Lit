import { Header, List, ListItem } from "semantic-ui-react"
import ClubImage from "./ClubImage"



const ClubList = ({headerText, list}) => {
  return (
      <>
        <Header>{headerText}</Header>
        <List horizontal className="display-list">
          {list && list.length ? list.map((item, i) => <ClubImage key={i} club={item}/>) : <ListItem content="No lists" />}
        </List>
      </>
    )
}

export default ClubList