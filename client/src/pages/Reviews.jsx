import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import ReviewList from "../components/lists/ReviewList"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import Loading from '../components/Loading';
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"


const Reviews = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  const { Form } = useForm()
  const { reviews } = useSearch()
  const [params, setParams] = useState()
  const [display, setDisplay] = useState('search')
  const [pageSize] = useState(20)

  useEffect(() => {
    if (params) reviews.refetch(params)
    else if (!reviews.getCachedDocs()) reviews.refetch(params)
  }, [reviews.refetch, params])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      setParams({ page: 1, pageSize })
    } else {
      setParams({ term, type, page: 1, pageSize })
    }
  }

  const nextPage = async () => setParams({ ...params, page: reviews.getPage() + 1 })
  const prevPage = async () => setParams({ ...params, page: reviews.getPage() - 1 })

  const headerText = () => {
    let text
    if (display === 'search') {
      if (!params?.term) text = `Showing all reviews`
      else text = `Showing results for "${params?.term}"`
    } else {
      text = "Showing your reviews"
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
    return reviews.getTotalPages() > 1 && <Button.Group className="list-nav-btns">
      <Button icon="angle left" disabled={reviews.getPage() === 1} onClick={prevPage} />
      <Button className="page" content={`pg ${reviews.getPage()}`} onClick={null} />
      <Button className="total-pages" content={`/ ${reviews.getTotalPages()}`} onClick={null} />
      <Button icon="angle right" disabled={reviews.getPage() === reviews.getTotalPages()} onClick={nextPage} />
    </Button.Group>
  }


  return (
    <div className="background3">
      <Container className="ui blue-box">
        <Header as='h1'>Book Reviews!</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} fields={[
              { name: 'term', useLabel: false, width: '12' },
              {
                name: 'type', useLabel: false, control: Dropdown, options: [
                  { text: 'Search book title', value: 'bookTitle' },
                  { text: 'By text', value: 'reviewText' },
                  { text: 'By creator', value: 'creator' },
                ], width: '4'
              }
            ]} buttons={auth ? [
              { content: 'My Reviews', color: 'green', onClick: () => setDisplay('profile') }
            ] : []} />
          </FormProvider>
        )}
        {display === 'profile' && (
          <>
            <Button icon="search" color="green" content="Search for Reviews" onClick={() => setDisplay('search')} />
            <Link to="/reviews/new" state={{}}>
              <Button icon="plus" color="teal" content="New Review" />
            </Link>
          </>

        )}

        <ReviewList list={display === 'search' ? reviews.getDocs() : profile?.reviews} />

      </Container>
    </div>
  )
}

export default Reviews