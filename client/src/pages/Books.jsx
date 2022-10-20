import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Container, Dropdown, Header, Message, Button } from 'semantic-ui-react'
import BookImageList from "../components/BookImageList"
import bookCache from "../utils/bookCache"
import { bookSearch } from "../utils/google"
import { useAuth } from '../context/AuthContext';
import { useProfile } from "../context/ProfileContext"

const cachedResults = bookCache.results.get()

const Books = (props) => {
  const [auth] = useAuth()
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const [results, setResults] = useState()
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const myBooks = auth ? profile.books : null

  const [page, setPageNum] = useState(1)
  const [pageSize] = useState(20)

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setSearchParams({ term, type })
      setPageNum(1)
      return bookSearch({ term, type, pageSize, page: 1 })
    }
  }
  const onResponse = async ({ data, error }) => {
    console.log('BOOK RESULTS', { data, error })
    if (data && data.items) {
      console.log(data)
      setTotalPages(data.totalItems / pageSize)
      setFresh(true)
      setResults(data.items)
      bookCache.results.set(data.items)
    }
  }

  const nextPage = async () => setPageNum(page + 1)
  const prevPage = async () => setPageNum(page - 1 || 1)
  useEffect(() => {
    let search = async function () {
      const { term, type } = searchParams
      if (term && type) {
        let { data } = await bookSearch({ term, type, pageSize, page })
        setResults(data.items)
        bookCache.results.set(data.items)
      }
    }
    search()
  }, [page, pageSize, searchParams])

  const [display, setDisplay] = useState('search')

  useEffect(() => {
    if (display === 'search') setResults(bookCache.results.get())
    else if (display === 'profile') setResults(myBooks)
  }, [display])

  return (
    <div className="background3">
      <Container className="blue-box">
        <Header as='h1'>Search</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} respond={onResponse} fields={[
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
        {fresh && totalPages > 1 && <div>
          <Button.Group floated="right">
            <Button icon="angle left" onClick={prevPage} />
            <Button content={page} onClick={null} />
            <Button icon="angle right" onClick={nextPage} />
          </Button.Group>
        </div>}

        {
          results
            ? <BookImageList header={display === 'search' ? 'Search Results' : 'Your Books'} list={results} />
            : results && <Message>No results</Message>
        }
      </Container >
    </div >
  )
}

export default Books