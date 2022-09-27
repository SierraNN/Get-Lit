import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import ListOfBookLists from "../components/lists/ListOfBookLists"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import Loading from '../components/Loading';
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"

const Lists = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  // const myLists = auth ? profile.lists : null
  const { Form } = useForm()
  const { lists } = useSearch()
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [display, setDisplay] = useState('search')
  const [page, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(20)

  useEffect(() => {
    lists.refetch()
  }, [])

  useEffect(() => {
    let data = lists.getQueryData()
    if (!lists.loading && data) {
      let { page, totalPages } = data
      setPageNum(page)
      setTotalPages(totalPages)
    }
  }, [lists.loading, lists.data])

  useEffect(() => {
    if (searchParams.term) {
      lists.refetch({ variables: { params: searchParams } })
      setFresh(true)
    }
  }, [searchParams])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setPageNum(1)
      setSearchParams({ term, type, page: 1, pageSize })
    }
  }

  const nextPage = async () => setPageNum(Math.min(page + 1, totalPages))
  const prevPage = async () => setPageNum(page - 1 || 1)

  if (lists.loading) return <div className="background3"><Loading /></div>

  return (
    <div className="background3">
      <Container className="ui container1">
        <Header as='h1'>Book Lists!</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} fields={[
              { name: 'term', useLabel: false, width: '12' },
              {
                name: 'type', useLabel: false, control: Dropdown, options: [
                  { text: 'Search list name', value: 'name' },
                  { text: 'By description', value: 'description' },
                  { text: 'By tags', value: 'tags' },
                  { text: 'By creator', value: 'creator' },
                ], width: '4'
              }
            ]} buttons={auth ? [{ content: 'My Lists', color: 'green', onClick: () => setDisplay('profile') }] : []} />
            {fresh && totalPages > 1 && <div>
              <Button.Group floated="right">
                <Button icon="angle left" onClick={prevPage} />
                <Button content={page} onClick={null} />
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
        <ListOfBookLists list={display === 'search' ? lists.getDocs() : profile?.lists} />

      </Container>
    </div>
  )
}

export default Lists