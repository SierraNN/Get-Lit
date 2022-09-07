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

const cachedResults = bookLists.results.get()

const Lists = (props) => {


  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const myLists = auth ? profile.lists : null
  const { Form } = useForm()
  const [results, setResults] = useState(cachedResults)
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [display, setDisplay] = useState('search')

  useEffect(() => {
    if (display === 'search') setResults(bookLists.results.get())
    else if (display === 'profile') setResults(myLists)
  }, [display, myLists])

  const { loading, data, refetch } = useQuery(GET_LISTS, {
    variables: { ...searchParams }
  })

  useEffect(() => {
    if (data && data.getLists) {
      setResults(data.getLists)
      console.log('data', data)
    }
  }, [data])
  useEffect(() => {
    const search = async () => {
      let { loading, data } = await refetch({ params: searchParams })
      console.log('search', { searchParams, loading, data })
      setFresh(true)
      setResults(data.getLists)
      bookLists.results.set(data.getLists)
    }
    if (searchParams.term) search()
  }, [searchParams])

  const [pageNum, setPageNum] = useState(1)
  const [pageSize] = useState(20)

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setPageNum(1)
      setSearchParams({ term, type, pageNum: 1, pageSize })
      return { data }
    }
  }

  const nextPage = async () => setPageNum(pageNum + 1)
  const prevPage = async () => setPageNum(pageNum - 1 || 1)

  if (loading) return <div className="background5"><Loading /></div>

  return (
    <div className="background5">
      <Container  className="ui container1">
        <FormProvider>
          <Header as='h1'>Book Lists!</Header>
          <Form submit={onSubmit} fields={[
            { name: 'term', useLabel: false, width: '12' },
            {
              name: 'type', useLabel: false, control: Dropdown, options: [
                { text: 'Search list name', value: 'name' },
                { text: 'By description', value: 'description' },
                { text: 'By tags', value: 'tags' },
                { text: 'By creator', value: 'creator' },
              ], width: '4'
            }
          ]} buttons={auth ? [{ content: 'My Book List', color: 'green', onClick: () => setDisplay('profile') }] : []} />
          {fresh && <div>
            <Button.Group floated="right">
              <Button icon="angle left" onClick={prevPage} />
              <Button content={pageNum} onClick={null} />
              <Button icon="angle right" onClick={nextPage} />
            </Button.Group>
          </div>}
        </FormProvider>

        {results
          ? <ListOfLists list={results} />
          : results && <Message>No results</Message>
        }
      </Container>
    </div>
  )
}

export default Lists