import { useQuery } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import ClubList from "../components/lists/ClubList"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import clubCache from "../utils/clubCache"
import { GET_CLUBS } from "../utils/queries"
import Loading from '../components/Loading';
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"


const Clubs = (props) => {
  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { clubs } = useSearch()
  const [searchParams, setSearchParams] = useState({})
  const [fresh, setFresh] = useState(false)
  const [display, setDisplay] = useState('search')
  const [pageNum, setPageNum] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(20)

  useEffect(() => {
    clubs.refetch()
  }, [])

  // useEffect(() => {
  //   if (display === 'search') setResults(clubCache.results.get())
  //   else if (display === 'profile') setResults(myClubs)
  // }, [display, myClubs])

  // const { loading, data, refetch } = useQuery(GET_CLUBS, {
  //   variables: { ...searchParams }
  // })

  useEffect(() => {
    let data = clubs.getQueryData()
    if (!clubs.loading && data) {
      let { docs, page, totalDocs, totalPages } = data
      setPageNum(page)
      setTotalPages(totalPages)
    }
  }, [clubs.loading, clubs.data])

  useEffect(() => {
    if (searchParams.term) {
      clubs.refetch({ variables: { params: searchParams } })
    }
  }, [searchParams])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      return { errors: { term: 'Please enter a search term' } }
    } else {
      setPageNum(1)
      setSearchParams({ term, type, pageNum: 1, pageSize })
    }
  }

  const nextPage = async () => setPageNum(Math.min(pageNum + 1, totalPages))
  const prevPage = async () => setPageNum(pageNum - 1 || 1)

  if (clubs.loading) return <div className="background5"><Loading /></div>

  return (
    <div className="background3">
      <Container className="ui container1">
        <Header as='h1'>Book Clubs!</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} fields={[
              { name: 'term', useLabel: false, width: '12' },
              {
                name: 'type', useLabel: false, control: Dropdown, options: [
                  { text: 'Search club name', value: 'name' },
                  { text: 'By description', value: 'description' },
                  { text: 'By tags', value: 'tags' },
                  { text: 'By creator', value: 'creator' },
                ], width: '4'
              }
            ]} buttons={auth ? [{ content: 'My Clubs', color: 'green', onClick: () => setDisplay('profile') }] : []} />
            {fresh && totalPages > 1 && <div>
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
            <Button icon="search" color="green" content="Search for Clubs" onClick={() => setDisplay('search')} />
            <Link to="/clubs/new">
              <Button icon="plus" color="teal" content="New Club" />
            </Link>

          </>

        )}
        <ClubList list={display === 'search' ? clubs.getDocs() : profile?.clubs} />

      </Container>
    </div>
  )
}

export default Clubs