import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header } from "semantic-ui-react"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import UserList from "../components/lists/UserList"
import { useSearch } from "../context/SearchContext"
import { useNavigate } from "react-router-dom"

const Users = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  const { Form } = useForm()
  const { users } = useSearch()
  const [params, setParams] = useState()
  const [display, setDisplay] = useState('search')
  const [pageSize] = useState(20)
  const navigate = useNavigate()

  useEffect(() => {
    if (params) users.refetch(params)
    else if (!users.getCachedDocs()) users.refetch(params)
  }, [users.refetch, params])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      setParams({ page: 1, pageSize })
    } else {
      setParams({ term, type, page: 1, pageSize })
    }
  }

  const nextPage = async () => setParams({ ...params, page: users.getPage() + 1 })
  const prevPage = async () => setParams({ ...params, page: users.getPage() - 1 })

  const headerText = () => {
    let text
    if (display === 'search') {
      if (!params?.term) text = `Showing all users`
      else text = `Showing results for "${params?.term}"`
    } else {
      text = "Showing your friends"
    }
    return text
  }
  const ListHeader = () => {
    return <Header as='h2'>
      {headerText()}
      {params?.term && <Button className="clear-results" negative content={params?.term} icon="x" compact onClick={() => setParams({ ...params, term: undefined })} />}
      {display === 'search' && <ListNav />}
    </Header>
  }
  const ListNav = () => {
    return users.getTotalPages() > 1 && <Button.Group className="list-nav-btns">
      <Button icon="angle left" disabled={users.getPage() === 1} onClick={prevPage} />
      <Button className="page" content={`pg ${users.getPage()}`} onClick={null} />
      <Button className="total-pages" content={`/ ${users.getTotalPages()}`} onClick={null} />
      <Button icon="angle right" disabled={users.getPage() === users.getTotalPages()} onClick={nextPage} />
    </Button.Group>
  }

  return (
    <div className="background2">
      <Container className="blue-box">
        <Header as='h1'>Fellow Readers</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} fields={[
              { name: 'term', useLabel: false, width: '12', initial: params?.term },
              {
                name: 'type', useLabel: false, control: Dropdown, options: [
                  { text: 'Username', value: 'username' },
                  { text: 'Genres', value: 'tags' },
                ], width: '4'
              }
            ]
            } buttons={auth ? [
              { content: 'Friends', icon: 'heart', color: 'green', onClick: () => setDisplay('profile') },
              { content: 'Your Profile', icon: 'user circle', color: 'teal', onClick: () => { navigate("/profile") } }
            ] : []} />
          </FormProvider>
        )}
        {display === 'profile' && (
          <>
            <Button icon="search" color="green" content="Search for Users" onClick={() => setDisplay('search')} />
          </>
        )}


        <UserList header={<ListHeader />} list={display === 'search' ? users.getDocs() : profile?.following} />

      </Container>
    </div>
  )
}

export default Users