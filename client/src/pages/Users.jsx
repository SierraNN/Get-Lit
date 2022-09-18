import { useQuery } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
// import ListOfLists from "../components/lists/ListOfLists"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import userCache from "../utils/userCache"
import { GET_USERS } from "../utils/queries"
import Loading from '../components/Loading';
import { Link } from "react-router-dom"
import UserList from "../components/lists/UserList"

const cachedResults = userCache.results.get()

const Lists = (props) => {
  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const following = auth ? profile.following : null
  const { Form } = useForm()
  const [results, setResults] = useState(cachedResults)
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [display, setDisplay] = useState('search')
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(20)


  useEffect(() => {
    if (display === 'search') setResults(userCache.results.get())
    else if (display === 'profile') setResults(following)
  }, [display, following])

  const { loading, data, refetch } = useQuery(GET_USERS, {
    variables: { ...searchParams }
  })

  useEffect(() => {
    if (data && data.getUsers) {
      let { docs, page, totalDocs, totalPages } = data.getUsers
      setResults(docs)
      userCache.results.set(docs)
      setPageNum(page)
      setTotalPages(totalPages)
      console.log('data', data, { docs, page })
    }
  }, [data])
  useEffect(() => {
    const search = async () => {
      await refetch({ params: searchParams })
      console.log('search', { searchParams })
      setFresh(true)
    }
    if (searchParams.term) search()
  }, [searchParams])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setPageNum(1)
      setSearchParams({ term, type, pageNum: 1, pageSize })
      return { data }
    }
  }

  const nextPage = async () => setPageNum(Math.min(pageNum + 1, totalPages))
  const prevPage = async () => setPageNum(pageNum - 1 || 1)

  if (loading) return <div className="background5"><Loading /></div>

  return (
    <div className="background2">
      <Container className="container1">
        <Header as='h1'>Fellow Readers</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submit={onSubmit} fields={[
              { name: 'term', useLabel: false, width: '12' },
              {
                name: 'type', useLabel: false, control: Dropdown, options: [
                  { text: 'Search username', value: 'name' },
                  { text: 'By tags', value: 'tags' },
                ], width: '4'
              }
            ]} buttons={auth ? [{ content: 'Following', color: 'green', onClick: () => setDisplay('profile') }] : []} />
            {fresh && <div>
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
        {results
          ? <UserList list={results} />
          : results && <Message>No results</Message>
        }
      </Container>
    </div>
  )
}

export default Lists