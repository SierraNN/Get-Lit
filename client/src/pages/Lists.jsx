import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import ListOfLists from "../components/lists/ListOfLists"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import bookLists from "../utils/bookLists"



const cachedResults = bookLists.results.get()

const Lists = (props) => {

  const [display, setDisplay] = useState('search')

  useEffect(() => {
    if (display === 'search') setResults(bookLists.results.get())
    else if (display === 'profile') setResults(myLists)
  }, [display])

  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const myLists = auth ? profile.lists : null
  const { Form } = useForm()
  const [results, setResults] = useState(cachedResults)
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)


  const [pageNum, setPageNum] = useState(1)
  const [pageSize] = useState(20)

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setPageNum(1)
      // return bookSearch({ term, type, pageSize, pageNum: 1 })
    }
  }
  const onResponse = async ({ data, error }) => {
    if (data) {
      setFresh(true)
      setResults(data.items)
      bookLists.results.set(data.items)
    }
  }

  const nextPage = async () => setPageNum(pageNum + 1)
  const prevPage = async () => setPageNum(pageNum - 1 || 1)


  return (
    <Container>
      <FormProvider>
        <Header as='h1'>Book Lists!</Header>
        <Form submit={onSubmit} respond={onResponse} fields={[
          { name: 'term', useLabel: false, width: '12' },
          {
            name: 'type', useLabel: false, control: Dropdown, options: [
              { text: 'Search all', value: 'all' },
              { text: 'By author', value: 'inauthor' },
              { text: 'By title', value: 'intitle' },
              { text: 'By subject', value: 'subject' },
            ], width: '4'
          }
        ]} buttons={auth ? [{ content: 'My Book List', color: 'green', onClick: () => setDisplay('profile') }] : []}/>
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
  )
}

export default Lists