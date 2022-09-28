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
  const { Form } = useForm()
  const { lists } = useSearch()
  const [params, setParams] = useState({})
  const [display, setDisplay] = useState('search')
  const [pageSize] = useState(20)

  useEffect(() => {
    if (params) lists.refetch(params)
    else if (!lists.getCachedDocs()) lists.refetch(params)
  }, [lists.refetch, params])

  const onSubmit = async ({ term, type }) => {
    if (term === '') {
      setParams({ page: 1, pageSize })
    } else {
      setParams({ term, type, page: 1, pageSize })
    }
  }

  const nextPage = async () => setParams({ ...params, page: lists.getPage() + 1 })
  const prevPage = async () => setParams({ ...params, page: lists.getPage() - 1 })

  const headerText = () => {
    let text
    if (display === 'search') {
      if (!params?.term) text = `Showing all lists`
      else text = `Showing results for "${params?.term}"`
    } else {
      text = "Showing your lists"
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
    return lists.getTotalPages() > 1 && <Button.Group className="list-nav-btns">
      <Button icon="angle left" disabled={lists.getPage() === 1} onClick={prevPage} />
      <Button className="page" content={`pg ${lists.getPage()}`} onClick={null} />
      <Button className="total-pages" content={`/ ${lists.getTotalPages()}`} onClick={null} />
      <Button icon="angle right" disabled={lists.getPage() === lists.getTotalPages()} onClick={nextPage} />
    </Button.Group>
  }


  return (
    <div className="background3">
      <Container className="ui blue-box">
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
            ]} buttons={auth ? [
              { content: 'My Lists', color: 'green', onClick: () => setDisplay('profile') }
            ] : []} />
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
        <ListOfBookLists header={<ListHeader />} list={display === 'search' ? lists.getDocs() : profile?.lists} />

      </Container>
    </div>
  )
}

export default Lists