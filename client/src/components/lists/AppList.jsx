import { Header, List, ListItem } from "semantic-ui-react"
import AppHeader from "./AppHeader"

const AppList = ({ className, ItemComponent, emptyMessage, header = '', list }) => {
  return (
    <>
      <AppHeader content={header} />
      <List horizontal className={`display-list ${className}`}>
        {
          list && list.length
            ? list.map((item, i) => <ItemComponent key={i} info={item} />)
            : <ListItem className='empty' content={emptyMessage || "None"} />
        }
      </List>
    </>
  )
}

export default AppList