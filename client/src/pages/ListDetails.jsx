import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Container, Header, Label, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { GET_LIST } from "../utils/queries"
import BookImageList from "../components/BookImageList"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"


const ListDetails = (props) => {
  const { listId } = useParams()
  const [profile] = useProfile()
  const { Form } = useForm()
  const { data, refetch } = useQuery(GET_LIST, {
    variables: { id: listId }
  })
  const list = data?.getList || null
  useEffect(() => {
    if (listId) refetch()
  }, [listId])
  if (!list) return <Loading message="Retrieving list" />
  const isCreator = list.creator._id === profile._id
  const { name, description, books, comments, tags, creator } = list
  const addBook = () => {}
  return (
    <Container  className="ui container1">
      <Header as='h1' content={name} subheader={creator.username} />
      <Segment>
        <Header>Description</Header>
        {description} 
        <Label.Group>
          {tags.map(({text}, i) => <Label key={i} content={text}/>)}
        </Label.Group>
      </Segment>
      <Segment>
        <BookImageList headerText="Books in List" list={list.books}/>
        {isCreator && <Button content="add book" icon="plus" onClick={addBook} />}
      </Segment>
      <Segment>
        <FormProvider>
        <Form fields={[
          {name:"comment", control:"textarea", required:true}
          ]}/>
        </FormProvider>
        

      </Segment>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </Container>
  )
}

export default ListDetails