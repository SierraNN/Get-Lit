import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Container, Header, Label, List, Message, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { ADD_POST_TO_CLUB, EDIT_CLUB_POST, JOIN_CLUB, LEAVE_CLUB, REMOVE_CLUB_POST } from '../utils/mutations';
import UserList from "../components/lists/UserList"
import CommentList from "../components/lists/CommentList"
import { useFetch } from "../context/SearchContext"
import { useMutationCB } from "../hooks/useMutationCB"
import KeywordList from "../components/lists/KeywordList"


const ClubDetails = (props) => {
  const { clubId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { club } = useFetch()
  const [clubInfo, setClubInfo] = useState()

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
  const editPost = useMutationCB('editClubPost', EDIT_CLUB_POST, (update) => update)
  const deletePost = useMutationCB('removeClubPost', REMOVE_CLUB_POST, (update) => update)


  const updateClub = (data) => {
    let update = { ...clubInfo, ...data }
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
  }
  const onEdit = async (data) => {
    const update = await editPost({ variables: data })
    if (update) {
      updateClub({ posts: posts.map((post) => post._id === data.commentId ? { ...post, text: data.text } : post) })
    }
    return update
  }
  const onDelete = async (data) => {
    const update = await deletePost({ variables: data })
    if (update) updateClub({ posts: posts.filter(({ _id }) => _id !== data.commentId) })
    // console.log('Delete post not configured', { data })
  }

  const MembershipButton = ({ floated }) => {
    const handleClick = async () => {
      if (isMember) {
        leaveClub({ variables: { id: clubId } })
      } else {
        joinClub({ variables: { id: clubId } })
      }
    }
    return isMember ? (
      <Button className="margin-left-1" onClick={handleClick} negative floated={floated ? "right" : undefined} content="Leave Club" />
    ) : (
      <Button className="margin-left-1" onClick={handleClick} positive floated={floated ? "right" : undefined} content="Join Club" />
    )
  }


  return (
    <div className="background3 club-details">
      <Container className="blue-box">
        <Header as='h1' content={name} subheader={`Book Club, created by ${creator?.username}`} />
        <Segment>
          <Header as='h2'>
            Club Description
            {profile?._id && <MembershipButton floated='right' />}
          </Header>
          <p>{description}</p>
          <KeywordList list={tags} />
        </Segment>
        <Segment>
          <UserList header={<Header as='h2' content='Members' />} list={members} />
        </Segment>

        <Segment>
          <CommentList
            userCanPost={isMember}
            parents={{ clubId }}
            disabledMessage={<Message negative>Must be a member to post<MembershipButton /></Message>}
            header={<Header as='h2' content="General Conversation" />}
            onSubmit={submitPost}
            onEdit={onEdit}
            onDelete={onDelete}
            list={posts}
            noCommentLabel="No posts yet"
            textAreaLabel="Post your thoughts" />
        </Segment>
      </Container>
    </div>
  )
}

export default ClubDetails