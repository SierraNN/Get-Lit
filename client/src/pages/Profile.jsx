import { Container } from 'semantic-ui-react';
import { Divider, Header, Segment, Button, Menu } from 'semantic-ui-react';
import './Profile.css';
import { Dropdown } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import Bio from './Bio';
import ProfileImage from '../components/ProfileImage'
import { useProfile } from '../context/ProfileContext';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import BookImageList from '../components/BookImageList';
import ListOfLists from '../components/lists/ListOfLists';
import { ADD_FOLLOWING, REMOVE_FOLLOWING, UPDATE_BIO, UPDATE_USER_TAGS } from '../utils/mutations';
import UserList from '../components/lists/UserList';
import { useAuth } from '../context/AuthContext';

const Genres = [
  { key: 'fantasy', text: 'Fantasy', value: 'fantasy' },
  { key: 'dystopian', text: 'Dystopian', value: 'dystopian' },
  { key: 'design', text: 'Science Fiction', value: 'design' },
  { key: 'action adventure', text: 'Action & Adventure', value: 'action adventure' },
  { key: 'mystery', text: 'Mystery', value: 'mystery' },
  { key: 'suspense', text: 'Thriller & Suspense', value: 'suspense' },
  { key: 'horror', text: 'Horror', value: 'horror' },
  { key: 'historical fiction', text: 'Historical Fiction', value: 'historical fiction' },
  { key: 'romance', text: 'Romance', value: 'romance' },
  { key: 'womens fiction', text: 'Womens Fiction', value: 'womens fiction' },
  { key: 'lgbtq', text: 'LGBTQ+', value: 'lgbtq' },
  { key: 'contemporary fiction', text: 'Contemporary Fiction', value: 'contemporary fiction' },
  { key: 'literary fiction', text: 'Literary Fiction', value: 'literary fiction' },
  { key: 'graphic novel', text: 'Graphic Novel', value: 'graphic novel' },
  { key: 'young adult', text: 'Young Adult', value: 'young adult' },
  { key: 'memoir', text: 'Memoir & Autobiography', value: 'memoir' },
  { key: 'biography', text: 'Biography', value: 'biography' },
  { key: 'true crime', text: 'True Crime', value: 'true crime' },
]

const Profile = () => {
  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const [isOwnProfile, setIsOwnProfile] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const { userId = null } = useParams()

  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: {
      id: userId || profile?._id
    }
  })

  useEffect(() => {
    if (userId) {
      console.log(userId, profile?._id)
      refetch({ id: userId })
      setIsOwnProfile(userId === profile?._id)
    } else {
      setIsOwnProfile(true)
      if (profile?._id) refetch({ id: profile._id })
    }
  }, [userId, profile?._id])

  useEffect(() => {
    if (isOwnProfile) setUserInfo(profile)
  }, [profile, isOwnProfile])

  useEffect(() => {
    if (data && data?.getUser) {
      console.log(data.getUser)
      setUserInfo(data.getUser)
    }
  }, [data, data?.getUser])

  useEffect(() => {
    if (userInfo?._id) setIsFollowing((profile.following || []).find(({ _id }) => _id === userInfo._id) !== undefined)
  }, [userInfo])

  const { _id, username, bio, following = [], books = [], lists = [], clubs = [] } = userInfo

  const [updateUserTags] = useMutation(UPDATE_USER_TAGS)

  const tags = (userInfo.tags || []).map(({ text }) => text)
  const GenresSelect = () => (
    <Segment raised>
      <div>
        <i className='tag icon' />
        <Menu>
          <Dropdown disabled={!isOwnProfile} placeholder='Genres' value={tags} fluid multiple selection options={Genres}
            onChange={(ev, { value }) => {
              let update = async () => {
                let { data, error } = await updateUserTags({
                  variables: { tags: value }
                })
                if (data?.updateUserTags) {
                  updateProfile('UPDATE_TAGS', data.updateUserTags)
                  setUserInfo({ ...userInfo, tags: data.updateUserTags })
                }
              }
              update()
            }} />
        </Menu>
      </div>
    </Segment>
  )


  const FriendsContainer = () => (
    //edit this so it renders dynamically
    <Container>
      <Header>Following</Header>
      <UserList list={following} />
    </Container>
  )

  const [updateBio] = useMutation(UPDATE_BIO)
  const BioContainer = () => (
    <Container>
      <Header>Bio</Header>
      <Bio isOwnProfile={isOwnProfile} initial={bio} save={async (value) => {
        const { data } = await updateBio({ variables: { bio: value } })
        if (data?.updateBio) updateProfile('SET_PROFILE', { bio: data.updateBio })
      }} />
    </Container>
  )
  const FavoritesContainer = () => (
    //edit this so it renders dynamically
    <Container>
      <BookImageList headerText="Favorite Books" list={books} />
    </Container>
  )
  const BookListContainer = () => (
    //edit this so it renders dynamically
    <Container>
      <ListOfLists headerText="Book Lists" list={lists} />
    </Container>
  )

  const Title = () => (
    <Segment>
      <ProfileImage spriteChoice={userInfo.spriteChoice} isOwnProfile={isOwnProfile} />
    </Segment>
  )

  const [isFollowing, setIsFollowing] = useState((profile.following || []).find(({ _id }) => _id === userInfo._id) !== undefined)
  const [addFollowing] = useMutation(ADD_FOLLOWING)
  const [removeFollowing] = useMutation(REMOVE_FOLLOWING)
  const handleFollowingClick = async () => {
    if (isFollowing) {
      const { data, error } = await removeFollowing({
        variables: { followingId: userInfo._id }
      })
      if (data && data?.removeFollowing) {
        updateProfile('SET_PROFILE', { following: data.removeFollowing })
        setIsFollowing(false)
      }
    } else {
      const { data, error } = await addFollowing({
        variables: { followingId: userInfo._id }
      })
      if (data && data?.addFollowing) {
        updateProfile('SET_PROFILE', { following: data.addFollowing })
        setIsFollowing(true)
      }
    }
  }
  return (
    <div className="background1">
      <Segment className='profile'>
        <Header as='h1'>
          {username} {auth && !isOwnProfile && <Button color={isFollowing ? "red" : "green"} style={{ marginLeft: '2rem' }} onClick={handleFollowingClick}>
            <i className="icon user"></i>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
          }
        </Header>
        <Title />
        <Divider clearing />
        <GenresSelect />
        <Segment color='brown'><BioContainer /></Segment>
        <Segment color='brown'><FriendsContainer /></Segment>
        <Segment color='brown'><BookListContainer /></Segment>
        <Segment color='brown'><FavoritesContainer /></Segment>
      </Segment>
    </div>
  )
}
export default Profile

