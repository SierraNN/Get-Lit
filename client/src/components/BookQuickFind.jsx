import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Message } from "semantic-ui-react";
import bookCache from "../utils/bookCache";
import { bookSearch } from "../utils/google"
import BookImageList from './BookImageList';

const BookQuickFind = ({ onBookClick }) => {
  const { Form } = useForm()
  const [results, setResults] = useState()
  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      return bookSearch({ term, type: 'all', pageNum: 1 })
    }
  }
  const onResponse = async ({ data, error }) => {
    if (data) {
      setResults(data.items)
      bookCache.results.set(data.items)
    }
  }

  return (
    <div>
      <FormProvider>
        <Form submitBtnText="Quick Book Search" submit={onSubmit} respond={onResponse} fields={[
          { name: 'term', useLabel: false, placeholder: 'Find a Book' },
        ]} />
      </FormProvider>
      {results
        ? <BookImageList headerText={'Quick Find Results'} list={results} onImageClick={onBookClick} />
        : results && <Message>No results</Message>}
    </div>
  )
}

export default BookQuickFind