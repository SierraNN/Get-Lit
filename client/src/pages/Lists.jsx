import { useState } from "react"
import { Button, Container } from "semantic-ui-react"
import ListOfBookLists from "../components/lists/ListOfBookLists"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"
import SearchComponent from "../components/search/SearchComponent"
import AppHeader from "../components/lists/AppHeader"

const Lists = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  const { lists } = useSearch()
  const [display, setDisplay] = useState('search')

  const searchOptions = [
    { text: 'By list name', value: 'name' },
    { text: 'By description', value: 'description' },
    { text: 'By keyword', value: 'tags' },
    { text: 'By creator', value: 'creator_name' },
  ]
  const extraButtons = auth ? [
    { content: 'My Lists', color: 'green', onClick: () => setDisplay('profile') }
  ] : []

  return (
    <div className="background3">
      <Container className="blue-box">
        {
          display === 'search'
            ? <SearchComponent
              modelName='Book Lists'
              context={lists}
              ListComponent={ListOfBookLists}
              extraButtons={extraButtons}
              searchOptions={searchOptions} />
            : <>
              <AppHeader as='h1' content='Your Book Lists' />
              <Button icon="search" color="green" content="Search for Lists" onClick={() => setDisplay('search')} />
              <Link to="/lists/new">
                <Button icon="plus" color="teal" content="New List" />
              </Link>
              <ListOfBookLists list={profile?.lists} />
            </>
        }
      </Container>
    </div>
  )
}

export default Lists