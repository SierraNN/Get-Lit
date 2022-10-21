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
import { ADD_COMMENT_TO_LIST, EDIT_LIST_COMMENT, REMOVE_LIST_COMMENT } from '../utils/mutations';
import { useFetch } from "../context/SearchContext"
import CommentList from "../components/lists/CommentList"
import { useMutationCB } from "../hooks/useMutationCB"
import KeywordList from "../components/lists/KeywordList"


const ListDetails = (props) => {
  const { listId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { list } = useFetch()
  const [listInfo, setListInfo] = useState()

  const updateList = (data) => {
    let update = { ...listInfo, ...data }
    setListInfo(update)
    list.updateCacheById(listId, update)
  }

  useEffect(() => {
    let subscription = list.observable.subscribe((list) => updateList(list))
    return () => { subscription.unsubscribe() }
  }, [])

  useEffect(() => {
    if (listId) list.setId(listId)
  }, [listId, profile.lists])


  const createComment = useMutationCB('addCommentToList', ADD_COMMENT_TO_LIST,
    comments => updateList({ comments })
  )
  const editComment = useMutationCB('editListComment', EDIT_LIST_COMMENT, (update) => update)
  const deleteComment = useMutationCB('removeListComment', REMOVE_LIST_COMMENT, (update) => update)


  if (!listInfo) return <Loading message="Retrieving list" />
  const isCreator = listInfo.creator._id === profile._id
  const { name, description, books, comments, tags, creator } = listInfo

  const submitComment = async ({ text }) => {
    return await createComment({ variables: { listId, comment: text } })
  }
  const onEdit = async (data) => {
    const update = await editComment({ variables: data })
    if (update) {
      updateList({ comments: comments.map((comment) => comment._id === data.commentId ? { ...comment, text: data.text } : comment) })
    }
    return update
  }
  const onDelete = async (data) => {
    const update = await deleteComment({ variables: data })
    if (update) updateList({ comments: comments.filter(({ _id }) => _id !== data.commentId) })
  }

  // console.log('LIST BOOKS', books)

  return (
    <div className="background3">
      <Container className="blue-box">
        <Header as='h1' content={name} subheader={creator.username} />
        <Segment>
          <Header as='h2'>Description</Header>
          <p>{description}</p>
          <KeywordList list={tags} />
        </Segment>
        <Segment>
          <BookImageList header="Books in List" list={books} />
          {isCreator && <Link to="/books"><Button content="add book" color="green" icon="plus" /></Link>}
        </Segment>
        <Segment>
          <CommentList
            parents={{ listId }}
            header={<Header as='h2' content="List Discussion" />}
            onSubmit={submitComment}
            onEdit={onEdit}
            onDelete={onDelete}
            list={comments}
            noCommentLabel="No comments yet"
            textAreaLabel="Comment on this list" />
        </Segment>
      </Container>
    </div>
  )
}

export default ListDetails