import { useState } from "react"
import { Button, Container } from "semantic-ui-react"
import ClubList from "../components/lists/ClubList"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"
import SearchComponent from "../components/search/SearchComponent"
import AppHeader from "../components/lists/AppHeader"


const Clubs = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  const { clubs } = useSearch()
  const [display, setDisplay] = useState('search')

  const searchOptions = [
    { text: 'By club name', value: 'name' },
    { text: 'By description', value: 'description' },
    { text: 'By tags', value: 'tags' },
    { text: 'By creator', value: 'creator_name' },
  ]
  const extraButtons = auth ? [
    { content: 'My Clubs', color: 'green', onClick: () => setDisplay('profile') }
  ] : []

  return (
    <div className="background3">
      <Container className="blue-box">
        {
          display === 'search'
            ? <SearchComponent
              modelName='Book Clubs'
              context={clubs}
              ListComponent={ClubList}
              extraButtons={extraButtons}
              searchOptions={searchOptions} />
            : <>
              <AppHeader as='h1' content='Your Book Clubs' />
              <Button icon="search" color="green" content="Search for Book Clubs" onClick={() => setDisplay('search')} />
              <Link to="/clubs/new">
                <Button icon="plus" color="teal" content="New Book Club" />
              </Link>
              <ClubList list={profile?.clubs} />
            </>
        }
      </Container>
    </div>
  )
}

export default Clubs