import { useQuery } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import userCache from "../utils/userCache"
import { GET_USERS } from "../utils/queries"
import Loading from '../components/Loading';
import UserList from "../components/lists/UserList"
import { useSearch } from "../context/SearchContext"

// const cachedResults = userCache.results.get()

const Users = (props) => {
  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { users } = useSearch()
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [display, setDisplay] = useState('search')
  const [pageNum, setPageNum] = useState(users.getPage())
  const [totalPages, setTotalPages] = useState(users.getTotalPages())
  const [pageSize] = useState(20)

  useEffect(() => {
    users.refetch()
  }, [])

  useEffect(() => {
    let data = users.getQueryData()
    if (!users.loading && data) {
      let { page, totalPages } = data
      setPageNum(page)
      setTotalPages(totalPages)
    }
  }, [users.loading, users.data])

  useEffect(() => {
    if (searchParams.term) {
      users.refetch({ variables: { params: searchParams } })
      setFresh(true)
    }
  }, [searchParams])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setPageNum(1)
      setSearchParams({ term, type, pageNum: 1, pageSize })
    }
  }

  const nextPage = async () => setPageNum(Math.min(pageNum + 1, totalPages))
  const prevPage = async () => setPageNum(pageNum - 1 || 1)

  if (users.loading) return <div className="background5"><Loading /></div>

  return (
    <div className="background2">
      <Container className="container1">
        <Header as='h1'>Fellow Readers</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} fields={[
              { name: 'term', useLabel: false, width: '12', initial: searchParams.term },
              {
                name: 'type', useLabel: false, control: Dropdown, options: [
                  { text: 'Search username', value: 'username' },
                  { text: 'Genres', value: 'tags' },
                ], width: '4'
              }
            ]} buttons={auth ? [{ content: 'Following', color: 'green', onClick: () => setDisplay('profile') }] : []} />
            {fresh && totalPages > 1 && <div>
              <Button.Group floated="right">
                <Button icon="angle left" onClick={prevPage} />
                <Button content={pageNum} onClick={null} />
                <Button icon="angle right" onClick={nextPage} />
              </Button.Group>
            </div>}
          </FormProvider>
        )}
        {display === 'profile' && (
          <>
            <Button icon="search" color="green" content="Search for Users" onClick={() => setDisplay('search')} />
          </>

        )}

        <UserList list={display === 'search' ? users.getDocs() : profile?.following} />
      </Container>
    </div>
  )
}

export default Users