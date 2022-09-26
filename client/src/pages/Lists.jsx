import { useQuery } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import ListOfLists from "../components/lists/ListOfLists"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import bookLists from "../utils/bookLists"
import { GET_LISTS } from "../utils/queries"
import Loading from '../components/Loading';
import { Link } from "react-router-dom"

const cachedResults = bookLists.results.get()

const Lists = (props) => {


  const [auth] = useAuth()
  const [profile] = useProfile()
  const myLists = auth ? profile.lists : null
  const { Form } = useForm()
  const [results, setResults] = useState(cachedResults)
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [display, setDisplay] = useState('search')
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(20)


  useEffect(() => {
    if (display === 'search') setResults(bookLists.results.get())
    else if (display === 'profile') setResults(myLists)
  }, [display, myLists])

  const { loading, data, refetch } = useQuery(GET_LISTS, {
    variables: { ...searchParams }
  })

  useEffect(() => {
    if (data && data.getLists) {
      let { docs, page, totalDocs, totalPages } = data.getLists
      setResults(docs)
      bookLists.results.set(docs)
      setPageNum(page)
      setTotalPages(totalPages)
    }
  }, [data])
  useEffect(() => {
    const search = async () => {
      await refetch({ params: searchParams })
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

  if (loading) return <div className="background3"><Loading /></div>

  return (
    <div className="background3">
      <Container className="ui container1">
        <Header as='h1'>Book Lists</Header>
          {display === 'search' && (
            <FormProvider>
              <Form submit={onSubmit} fields={[
                { name: 'term', useLabel: false, width: '12' },
                {
                  name: 'type', useLabel: false, control: Dropdown, options: [
                    { text: 'Search list name', value: 'name' },
                    { text: 'By description', value: 'description' },
                    { text: 'By tags', value: 'tags' },
                    { text: 'By creator', value: 'creator' },
                  ], width: '5%'
                }
              ]}  buttons={auth ? [{ content: 'My Lists', color: 'green', onClick: () => setDisplay('profile') }] : []} />
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
            <Button icon="search" color="green" content="Search for Lists" onClick={() => setDisplay('search')} />
            <Link to="/lists/new">
              <Button icon="plus" color="teal" content="New List" />
            </Link>

          </>

        )}
        {results
          ? <ListOfLists list={results} />
          : results && <Message>No results</Message>
        }
      </Container>
    </div>
  )
}

export default Lists