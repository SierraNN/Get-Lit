import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Header, Label, List, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { GET_CLUB } from "../utils/queries"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { ADD_POST_TO_CLUB } from '../utils/mutations';
import UserList from "../components/lists/UserList"


const ClubDetails = (props) => {
  const { clubId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { data, refetch } = useQuery(GET_CLUB, {
    variables: { id: clubId }
  })
  const club = data?.getClub || null

  const [addPostToClub] = useMutation(ADD_POST_TO_CLUB)

  useEffect(() => {
    if (clubId) refetch()
  }, [clubId, profile.clubs])

  if (!club) return <Loading message="Retrieving club" />
  const isCreator = club.creator._id === profile._id
  const { name, description, members, posts, tags, creator } = club

  const onSubmit = async ({ text }) => {
    const { data } = await addPostToClub({
      variables: {
        clubId,
        post: text
      }
    })
    if (data && data.addPostToClub) {
      updateProfile('UPDATE_CLUB', { ...club, post: data.addPostToClub })
    }
    return { data }
  }

  return (
    <div className=" background3">
      <Header as='h1' content={name} subheader={creator.username} />
      <Segment>
        <Header>Description</Header>
        {description}
        <Label.Group>
          {tags.map(({ text }, i) => <Label key={i} content={text} />)}
        </Label.Group>
      </Segment>
      <Segment>
        <UserList headerText={'Members'} list={members} />
      </Segment>
      <Segment>
        <Header as='h3' content={`Posts`} />
        <List className="comment-list">
          {posts.map((post, i) => <List.Item key={i} >
            {post.text}<Label content={post.author.username} detail={post.createdAt} />
          </List.Item>)}
        </List>

        <FormProvider>
          <Form submit={onSubmit} fields={[
            { name: "text", label: 'Start a conversation!', control: "textarea", required: true }
          ]} />
        </FormProvider>
      </Segment>
    </div>
  )
}

export default ClubDetails