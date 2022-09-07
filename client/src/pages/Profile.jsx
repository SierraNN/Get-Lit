import { Container } from 'semantic-ui-react';
import { Divider, Header, Segment, Modal, Columns, Button, Icon, Menu } from 'semantic-ui-react';
import './Profile.css';
import { Dropdown } from 'semantic-ui-react';
import React, { Component, useEffect, useState } from 'react';
import Bio from './Bio';
import ProfileBookLists from './ProfileBookList';
import ProfileImage from '../components/ProfileImage'
import { useProfile } from '../context/ProfileContext';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import BookImageList from '../components/BookImageList';
import ListOfLists from '../components/lists/ListOfLists';

const Genres = [
  { key: 'fantasy', text: 'Fantasy', value: 'fantasy' },
  { key: 'dystopian', text: 'Dystopian', value: 'dystopian' },
  { key: 'design', text: 'Science Fiction', value: 'design' },
  { key: 'ember', text: 'Action & Adventure', value: 'ember' },
  { key: 'html', text: 'Mystery', value: 'html' },
  { key: 'ia', text: 'Thriller & Suspense', value: 'ia' },
  { key: 'javascript', text: 'Horror', value: 'javascript' },
  { key: 'mech', text: 'Historical Fiction', value: 'mech' },
  { key: 'meteor', text: 'Romance', value: 'meteor' },
  { key: 'node', text: 'Womens Fiction', value: 'node' },
  { key: 'plumbing', text: 'LGBTQ+', value: 'plumbing' },
  { key: 'python', text: 'Contemporary Fiction', value: 'python' },
  { key: 'rails', text: 'Literary Fiction', value: 'rails' },
  { key: 'react', text: 'Graphic Novel', value: 'react' },
  { key: 'repair', text: 'Young Adult', value: 'repair' },
  { key: 'ruby', text: 'Memoir & Autobiography', value: 'ruby' },
  { key: 'ui', text: 'Biography', value: 'ui' },
  { key: 'ux', text: 'True Crime', value: 'ux' },
]

const Profile = () => {
  const [profile, updateProfile] = useProfile()
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const { userId = null } = useParams()

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      id: userId || (profile && profile._id) || null
    }
  })

  useEffect(() => {
    if (userId) refetch({ id: userId })
  }, [userId])
  useEffect(() => {
    if (data && data.getUser) {
      setUserInfo(data.getUser)
    }
  }, [data, data?.getUser])


  const GenresSelect = () => (
    <Segment raised>
      <p>
        <i className='tag icon' />
        <Menu>
          <Dropdown placeholder='Genres' fluid multiple selection options={Genres} />
        </Menu>
      </p>
    </Segment>
  )
  const FriendsContainer = () => (
    //edit this so it renders dynamically
    <Container>
      <Header>Followers List</Header>
      <div className="ui vertical list">
        <div className="item">
          <img className="ui mini circular image" src="" />
          <div className="content">
            <div className="ui sub header">Molly</div>
          </div>
        </div>
        <br />
        <div className="item">
          <img className="ui mini circular image" src="" />
          <div className="content">
            <div className="ui sub header">Elyse</div>
          </div>
        </div>
        <br />
        <div className="item">
          <img src="" className="ui mini circular image" />
          <div className="content">
            <div className="ui sub header">Eve</div>
          </div>
        </div>
      </div>
    </Container>
  )
  const BioContainer = () => (
    <Container>
      <Header>Bio</Header>
      <Bio />
    </Container>
  )
  const FavoritesContainer = () => (
    //edit this so it renders dynamically
    <Container>
      <Header>Favorites</Header>
      <div className="ui vertical list">
        <div className="ui sub">Insert Favorites Here</div>
      </div>
      <br />

    </Container>
  )
  const BookListContainer = () => (
    //edit this so it renders dynamically
    <Container>
      <Header>Book Lists</Header>
      <div className="ui vertical list">
        <ListOfLists list={userInfo.lists} />
      </div>
      <br />

    </Container>
  )
  const Title = () => (
    <Segment>
      <Button className='right floated button' onClick={() => { console.log('add mutation') }}>
        <i className="icon user"></i>
        Follow
      </Button>
      <br /><br />
      {/* <Divider className="ui vertical divider" color='brown' /> */}

      <ProfileImage spriteChoice={userInfo.spriteChoice} editable={isOwnProfile} />
    </Segment>
  )

  const { _id, username, following, books, lists, clubs, tags } = userInfo
  console.log({ userInfo })
  return (
    <div className="background1">
      {/* <div className="right floated sixteen wide column body"> */}
      <Segment>
        {username}
        <Title />
        <Divider clearing />
        <GenresSelect />
        <Segment color='brown'><BioContainer /></Segment>
        <Segment color='brown'><FriendsContainer /></Segment>
        <Segment color='brown'><BookListContainer /></Segment>
        <Segment color='brown'><FavoritesContainer /></Segment>
      </Segment>
      {/* </div> */}
    </div>
  )
}
export default Profile

