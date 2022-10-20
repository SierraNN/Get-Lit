import { useState } from "react"
import { Button, Container } from "semantic-ui-react"
import ReviewList from "../components/lists/ReviewList"
import { useAuth } from "../context/AuthContext"
import { useProfile } from "../context/ProfileContext"
import { Link } from "react-router-dom"
import { useSearch } from "../context/SearchContext"
import SearchComponent from "../components/search/SearchComponent"
import AppHeader from "../components/lists/AppHeader"


const Reviews = (props) => {
  const [auth] = useAuth()
  const [profile] = useProfile()
  const { reviews } = useSearch()
  const [display, setDisplay] = useState('search')

  const searchOptions = [
    { text: 'By book title', value: 'bookTitle' },
    { text: 'By review title', value: 'reviewTitle' },
    { text: 'By review text', value: 'reviewText' },
    { text: 'By creator', value: 'creator_name' },
  ]
  const extraButtons = auth ? [
    { content: 'My Reviews', color: 'green', onClick: () => setDisplay('profile') }
  ] : []

  return (
    <div className="background3">
      <Container className="blue-box">
        {
          display === 'search'
            ? <SearchComponent
              modelName='Book Reviews'
              context={reviews}
              ListComponent={ReviewList}
              extraButtons={extraButtons}
              searchOptions={searchOptions} />
            : <>
              <AppHeader as='h1' content='Your Book Reviews' />
              <Button icon="search" color="green" content="Search for Reviews" onClick={() => setDisplay('search')} />
              <Link to="/reviews/new">
                <Button icon="plus" color="teal" content="New Review" />
              </Link>
              <ReviewList list={profile?.reviews} />
            </>
        }
      </Container>
    </div>
  )
}

export default Reviews