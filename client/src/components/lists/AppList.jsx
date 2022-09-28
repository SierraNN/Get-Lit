import { Header, List, ListItem } from "semantic-ui-react"
import AppListHeader from "./AppListHeader"

const AppList = ({ className, ItemComponent, emptyMessage, header, list }) => {
  return (
    <>
      <AppListHeader header={header} />
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