import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect, useState } from "react"
import { Button, Container, Dropdown, Header, Message } from "semantic-ui-react"
import ClubList from "../components/lists/ClubList"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"


const Clubs = (props) => {
  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { clubs } = useSearch()
  const [params, setParams] = useState({})
  const [display, setDisplay] = useState('search')
  const [pageSize] = useState(20)

  useEffect(() => {
    clubs.refetch()
  }, [clubs.refetch, params])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      setParams({ page: 1, pageSize })
    } else {
      setParams({ term, type, page: 1, pageSize })
    }
  }

  const nextPage = async () => setParams({ ...params, page: clubs.getPage() + 1 })
  const prevPage = async () => setParams({ ...params, page: clubs.getPage() - 1 })

  const headerText = () => {
    let text
    if (display === 'search') {
      if (!params.term) text = `Showing all Book Clubs`
      else text = `Showing results for "${params.term}"`
    } else {
      text = "Showing Book Clubs you've joined or own"
    }
    return text
  }
  const ListHeader = () => {
    return <Header as='h2'>
      {headerText()}
      {params.term && <Button className="clear-results" negative content={params.term} icon="x" compact onClick={() => setParams({ ...params, term: undefined })} />}
      {display === 'search' && <ListNav />}
    </Header>
  }
  const ListNav = () => {
    return clubs.getTotalPages() > 1 && <Button.Group className="list-nav-btns">
      <Button icon="angle left" disabled={clubs.getPage() === 1} onClick={prevPage} />
      <Button className="page" content={`pg ${clubs.getPage()}`} onClick={null} />
      <Button className="total-pages" content={`/ ${clubs.getTotalPages()}`} onClick={null} />
      <Button icon="angle right" disabled={clubs.getPage() === clubs.getTotalPages()} onClick={nextPage} />
    </Button.Group>
  }



  return (
    <div className="background3">
      <Container className="ui blue-box">
        <Header as='h1'>Book Clubs!</Header>
        {display === 'search' && (
          <FormProvider>
            <Form submitBtnText="Search" submit={onSubmit} fields={[
              {
                name: 'params', fields: [
                  { name: 'term', useLabel: false, width: '12' },
                  {
                    name: 'type', useLabel: false, control: Dropdown, options: [
                      { text: 'By club name', value: 'name' },
                      { text: 'By description', value: 'description' },
                      { text: 'By tags', value: 'tags' },
                      { text: 'By creator', value: 'creator' },
                    ], width: '4'
                  }
                ]
              }
            ]} buttons={auth ? [{ content: 'My Clubs', color: 'green', onClick: () => setDisplay('profile') }] : []} />
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
        <ClubList header={<ListHeader />} list={display === 'search' ? clubs.getDocs() : profile?.clubs} />

      </Container>
    </div>
  )
}

export default Clubs