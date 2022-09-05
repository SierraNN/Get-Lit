import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Container, Dropdown, Header, Message, Button } from 'semantic-ui-react'
import BookImageList from "../components/BookImageList"
import books from "../utils/books"
import { bookSearch } from "../utils/google"
import { useAuth } from '../context/AuthContext';
import { useQuery } from '@apollo/client';
import { MY_BOOKS } from '../utils/queries';
import { useLocation } from "react-router-dom"
import { useProfile } from "../context/ProfileContext"

const cachedResults = books.results.get()

const Books = (props) => {
  const [auth] = useAuth()
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const [results, setResults] = useState(cachedResults)
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const { state } = useLocation()

  const myBooks = auth ? profile.books : null

  const [pageNum, setPageNum] = useState(1)
  const [pageSize] = useState(20)

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setSearchParams({ term, type })
      setPageNum(1)
      return bookSearch({ term, type, pageSize, pageNum: 1 })
    }
  }
  const onResponse = async ({ data, error }) => {
    if (data) {
      setFresh(true)
      setResults(data.items)
      books.results.set(data.items)
    }
  }

  const nextPage = async () => setPageNum(pageNum + 1)
  const prevPage = async () => setPageNum(pageNum - 1 || 1)
  useEffect(() => {
    let search = async function () {
      const { term, type } = searchParams
      if (term && type) {
        let { data } = await bookSearch({ term, type, pageSize, pageNum })
        setResults(data.items)
        books.results.set(data.items)
      }
    }
    search()
  }, [pageNum, pageSize, searchParams])

  // const displayToggle = myBooks !== null
  const [display, setDisplay] = useState('search')

  useEffect(() => {
    if (display === 'search') setResults(books.results.get())
    else if (display === 'profile') setResults(myBooks)
  }, [display])

  return (
    <Container>
      <Header as='h1'>Books!</Header>
      {display === 'search' && (
        <FormProvider>
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
          ]} buttons={auth ? [{ content: 'My Books', color: 'green', onClick: () => setDisplay('profile') }] : []} />
        </FormProvider>
      )}
      {display === 'profile' && <Button icon="search" color="green" content="Search for Books" onClick={() => setDisplay('search')} />}
      {fresh && <div>
        <Button.Group floated="right">
          <Button icon="angle left" onClick={prevPage} />
          <Button content={pageNum} onClick={null} />
          <Button icon="angle right" onClick={nextPage} />
        </Button.Group>
      </div>}

      {results
        ? <BookImageList headerText={display === 'search' ? 'Search Results' : 'Your Books'} list={results} />
        : results && <Message>No results</Message>
      }
    </Container>
  )
}

export default Books