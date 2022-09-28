import { Container, Icon, Label } from 'semantic-ui-react';
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
import ListOfBookLists from '../components/lists/ListOfBookLists';
import { ADD_FOLLOWING, REMOVE_FOLLOWING, UPDATE_BIO, UPDATE_USER_TAGS } from '../utils/mutations';
import UserList from '../components/lists/UserList';
import { useAuth } from '../context/AuthContext';
import ClubList from '../components/lists/ClubList';
import ReviewList from '../components/lists/ReviewList';
import { useFetch } from '../context/SearchContext';

export const Genres = [
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
  const { user } = useFetch()

  useEffect(() => {
    async function getUser(id) {
      let fetchedUser = await user.getById(id)
      setUserInfo(fetchedUser)
    }
    if (userId) getUser(userId)
    else if (profile?._id) getUser(profile._id)
  }, [userId, profile])

  useEffect(() => {
    setIsOwnProfile(userInfo._id === profile?._id)
  }, [userInfo, profile])

  useEffect(() => {
    if (userInfo?._id) setIsFollowing((profile.following || []).find(({ _id }) => _id === userInfo._id) !== undefined)
  }, [userInfo])

  const { _id, username, bio, following = [], books = [], lists = [], clubs = [], reviews = [] } = userInfo

  const [updateUserTags] = useMutation(UPDATE_USER_TAGS)

  const tags = (userInfo.tags || []).map(({ text }) => text)
  const GenresSelect = () => (
    <Segment raised>
      <Header as='h3' icon='tag' content="Genre Tags" />
      {isOwnProfile ? <Dropdown placeholder='Genres' value={tags} fluid multiple selection options={Genres}
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
        }} /> : (
        <Label.Group>
          {tags.length ? tags.map((tag, i) => <Label key={i} content={tag} />) : <Label basic content='None' />}
        </Label.Group>
      )}

    </Segment>
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
      if (data?.removeFollowing) {
        updateProfile('SET_PROFILE', { following: data.removeFollowing })
        setIsFollowing(false)
      }
    } else {
      const { data, error } = await addFollowing({
        variables: { followingId: userInfo._id }
      })
      if (data?.addFollowing) {
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
        <Segment color='brown'><UserList header="Friends" list={following} /></Segment>
        <Segment color='brown'><ListOfBookLists header="Book Lists" list={lists} /></Segment>
        <Segment color='brown'><ClubList header="Clubs" list={clubs} /></Segment>
        <Segment color='brown'><ReviewList header="Reviews" list={reviews} /></Segment>
        <Segment color='brown'><BookImageList header="Favorited Books" list={books} /></Segment>
      </Segment>
    </div>
  )
}
export default Profile

