import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useState } from "react"
import { Card, Container, Dropdown, Header, Message } from 'semantic-ui-react'
import BookImageList from "../components/BookImageList"
import books from "../utils/books"
import { bookSearch } from "../utils/google"

const cachedResults = books.results.get()

const BookSearch = (props) => {
  const { Form } = useForm()
  const [results, setResults] = useState(cachedResults)
  // const [resultCount, setResultCount] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  // const [loading, setLoading] = useState(false)
  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      return bookSearch({ term, type, pageNum })
    }
  }
  const onResponse = async ({ data, error }) => {
    // console.log(data)
    if (data) {
      // setResultCount(data.totalItems)
      setResults(data.items)
      books.results.set(data.items)
    }
  }
  return (
    <Container  className="ui container1">
      <FormProvider>
        <Header as='h1'>Search</Header>
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
        ]} />
      </FormProvider>
      {results
        ? <BookImageList list={results} />
        : results && <Message>No results</Message>
      }
    </Container>
  )
}

export default BookSearch