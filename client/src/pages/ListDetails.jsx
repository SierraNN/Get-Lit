import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Container, Header, Label, List, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { GET_LIST } from "../utils/queries"
import BookImageList from "../components/BookImageList"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { ADD_COMMENT_TO_LIST } from '../utils/mutations';


const ListDetails = (props) => {
  const { listId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { data, refetch } = useQuery(GET_LIST, {
    variables: { id: listId }
  })
  const list = data?.getList || null

  const [addCommentToList] = useMutation(ADD_COMMENT_TO_LIST)

  useEffect(() => {
    if (listId) refetch()
  }, [listId, profile.lists])

  if (!list) return <Loading message="Retrieving list" />
  const isCreator = list.creator._id === profile._id
  const { name, description, books, comments, tags, creator } = list

  const onSubmit = async ({ text }) => {
    const { data } = await addCommentToList({
      variables: {
        listId,
        comment: text
      }
    })
    if (data && data.addCommentToList) {
      updateProfile('UPDATE_LIST', { ...list, comment: data.addCommentToList })
    }
    return { data }
  }

  return (
    <Container  className="ui container1 background3">
      <Header as='h1' content={name} subheader={creator.username} />
      <Segment>
        <Header>Description</Header>
        {description}
        <Label.Group>
          {tags.map(({ text }, i) => <Label key={i} content={text} />)}
        </Label.Group>
      </Segment>
      <Segment>
        <BookImageList headerText="Books in List" list={list.books} />
        {isCreator && <Link to="/books"><Button content="add book" color="green" icon="plus" /></Link>}
      </Segment>
      <Segment>
        <List>
          {list.comments.map((comment, i) => <List.Item key={i} >
            {comment.text}<Label content={comment.author.username} detail={comment.createdAt} />
          </List.Item>)}
        </List>

        <FormProvider>
          <Form submit={onSubmit} fields={[
            { name: "text", label: 'Comment on this list:', control: "textarea", required: true }
          ]} />
        </FormProvider>


      </Segment>
    </Container>
  )
}

export default ListDetails