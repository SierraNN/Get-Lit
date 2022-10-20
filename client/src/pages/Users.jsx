import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header } from "semantic-ui-react"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import UserList from "../components/lists/UserList"
import { useSearch } from "../context/SearchContext"
import { Link, useNavigate } from "react-router-dom"
import SearchComponent from "../components/search/SearchComponent"
import AppHeader from "../components/lists/AppHeader"

const Users = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  const { users } = useSearch()
  const [display, setDisplay] = useState('search')
  const navigate = useNavigate()

  const searchOptions = [
    { text: 'By Username', value: 'username' },
    { text: 'By Genre Tag', value: 'tags' },
  ]

  const extraButtons = auth ? [
    { content: 'Friends', icon: 'heart', color: 'green', onClick: () => setDisplay('profile') },
    { content: 'Your Profile', icon: 'user circle', color: 'teal', onClick: () => { navigate("/profile") } }
  ] : []

  return (
    <div className="background3">
      <Container className="blue-box">
        {
          display === 'search'
            ? <SearchComponent
              modelName='Users'
              context={users}
              ListComponent={UserList}
              extraButtons={extraButtons}
              searchOptions={searchOptions} />
            : <>
              <AppHeader as='h1' content='Your Favorite Users' />
              <Button icon="search" color="green" content="Search for Users" onClick={() => setDisplay('search')} />
              <UserList list={profile?.following} />
            </>
        }
      </Container>
    </div>
  )
}

export default Users