import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Header } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { GET_LIST } from "../utils/queries"

const ListDetails = (props) => {
  const { listId } = useParams()
  const [profile] = useProfile()
  const { data, refetch } = useQuery(GET_LIST, {
    variables: { id: listId }
  })
  const list = data?.getList || null
  useEffect(() => {
    if (listId) refetch()
  }, [listId])
  if (!list) return <Loading message="Retrieving list" />
  const isCreator = list.creator._id === profile._id
  const { name, description, books, comments, tags } = list
  return (
    <Container>
      <Header as='h1' content={name} subheader="Book List" />
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </Container>
  )
}

export default ListDetails