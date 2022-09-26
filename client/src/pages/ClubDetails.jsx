import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Header, Label, List, Message, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { ADD_POST_TO_CLUB, JOIN_CLUB, LEAVE_CLUB } from '../utils/mutations';
import UserList from "../components/lists/UserList"
import CommentList from "../components/lists/CommentList"
import { useFetch } from "../context/SearchContext"
import { useMutationCB } from "../hooks/useMutationCB"


const ClubDetails = (props) => {
  const { clubId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { club } = useFetch()
  const [clubInfo, setClubInfo] = useState()

  // const [addPostToClub] = useMutation(ADD_POST_TO_CLUB)
  const createPost = useMutationCB('addPostToClub', ADD_POST_TO_CLUB,
    posts => updateClub({ posts })
  )
  const joinClub = useMutationCB('joinClub', JOIN_CLUB, () => {
    updateProfile('ADD_CLUB', clubInfo)
    updateClub({ members: [profile, ...clubInfo.members] })
  })
  const leaveClub = useMutationCB('leaveClub', LEAVE_CLUB, () => {
    updateProfile('REMOVE_CLUB', clubInfo._id)
    updateClub({ members: clubInfo.members.filter(({ _id }) => _id !== profile._id) })
  })
  // const [joinClub] = useMutation(JOIN_CLUB)
  // const [leaveClub] = useMutation(LEAVE_CLUB)

  const updateClub = (data) => {
    let update = { ...clubInfo, ...data }
    console.log(update)
    setClubInfo(update)
    club.updateCacheById(clubId, update)
  }

  useEffect(() => {
    async function getClub(id) {
      let fetchedClub = await club.getById(id)
      setClubInfo(fetchedClub)
    }
    if (clubId) getClub(clubId)
  }, [clubId, profile.clubs])

  if (!clubInfo) return <Loading message="Retrieving club" />
  const { name, description, members = [], posts = [], tags = [], creator } = clubInfo
  const isCreator = creator._id === profile._id
  const isMember = members.find(({ _id }) => _id === profile._id)

  const submitPost = async ({ text }) => {
    return await createPost({ variables: { clubId, post: text } })
    // const { data } = await addPostToClub({
    //   variables: {
    //     clubId,
    //     post: text
    //   }
    // })
    // if (data && data.addPostToClub) {
    //   let withPosts = { ...clubInfo, posts: data.addPostToClub }
    //   updateClub(withPosts)
    // }
    // return { data }
  }
  const MembershipButton = ({ floated }) => {
    const handleClick = async () => {
      if (isMember) {
        leaveClub({
          variables: { id: clubId }
        })
      } else {
        joinClub({
          variables: { id: clubId }
        })
        // const { data } = await joinClub({
        //   variables: { id: clubId }
        // })
        // if (data && data.joinClub) {
        //   updateProfile('ADD_CLUB', clubInfo)
        //   updateClub({ ...clubInfo, members: [profile, ...members] })
        // }
      }
    }
    return isMember ? (
      <Button onClick={handleClick} negative floated={floated ? "right" : undefined} content="Leave Club" />
    ) : (
      <Button onClick={handleClick} positive floated={floated ? "right" : undefined} content="Join Club" />
    )
  }

  const ClubComments = () => {
    if (!profile?._id) {
      return (<Message positive>
        Must be logged in to post
        <Link to="/login" state={{ from: `/clubs/${clubId}` }}>
          <Button color="green" content="Log In" />
        </Link>
      </Message>)
    } else {
      return <CommentList
        userCanPost={isMember}
        disabledMessage={<Message negative>Must be a member to post<MembershipButton /></Message>}
        header={<Header as='h2' content="General Conversation" />}
        onSubmit={submitPost}
        list={posts}
        noCommentLabel="No posts yet"
        textAreaLabel="Post your thoughts" />
    }
  }

  return (
    <div className="background3 club-details">
      <Header as='h1' content={name} subheader={`Book Club, created by ${creator?.username}`} />
      <Segment>
        <Header as='h2'>
          Club Description
          {profile?._id && <MembershipButton floated='right' />}
        </Header>
        <p>{description}</p>
        <Label.Group>
          <Header as='h3'>Keywords</Header>
          {tags.map(({ text }, i) => <Label key={i} content={text} />)}
        </Label.Group>
      </Segment>
      <Segment>
        <UserList header={<Header as='h2' content='Members' />} list={members} />
      </Segment>

      <Segment>
        <ClubComments />
      </Segment>
    </div>
  )
}

export default ClubDetails