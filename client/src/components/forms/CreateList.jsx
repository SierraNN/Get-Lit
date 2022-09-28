import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Header, TextArea } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext";
import bookData from "../../utils/bookData";
import { CREATE_LIST } from '../../utils/mutations';

const BookListForm = (props) => {
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const navigate = useNavigate()
  const { state } = useLocation()
  const [createList] = useMutation(CREATE_LIST)
  const onSubmit = async (listInfo) => {
    const list = { ...listInfo }
    if (list.tags === '') list.tags = []
    else list.tags = list.tags.split(',')
    if (state && state.book) list.book = bookData(state.book)
    return createList({
      variables: { list }
    })
  }
  const onResponse = async ({ data }) => {
    if (data?.createList) {
      updateProfile('ADD_LIST', data.createList)
      navigate(`/lists/${data.createList._id}`)
    }
  }

  return (
    <div className="background3">
      <Container className="blue-box">
        <FormProvider>
          <Header as='h1'>New Book List</Header>
          <Form submit={onSubmit} respond={onResponse} fields={[
            { name: 'name', required: true },
            { name: 'description', control: TextArea },
            { name: 'tags', label: 'Tags (comma separated)' }
          ]} submitBtnText="Create List" />
        </FormProvider>
      </Container>
    </div>
  )
}

export default BookListForm