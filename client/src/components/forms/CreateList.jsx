import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Container, Header, TextArea } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext";
import { CREATE_LIST } from '../../utils/mutations';

const BookListForm = (props) => {
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const navigate = useNavigate()

  const [createList] = useMutation(CREATE_LIST)
  const onSubmit = async (listInfo) => {
    const submission = { ...listInfo }
    if (submission.tags === '') submission.tags = []
    else submission.tags = submission.tags.split(',')
    return createList({
      variables: { list: submission }
    })
  }
  const onResponse = async ({ data }) => {
    console.log(data.createList)
    if (data?.createList) {
      updateProfile('ADD_LIST', data.createList)
      navigate(`/lists/${data.createList._id}`)
    }
  }

  return (
    <Container>
      <FormProvider>
        <Header as='h1'>New Book List</Header>
        <Form submit={onSubmit} respond={onResponse} fields={[
          { name: 'name', required: true },
          { name: 'description', control: TextArea },
          { name: 'tags', label: 'Tags (comma separated)' }
        ]} submitBtnText="Create List" />
      </FormProvider>

    </Container>
  )
}

export default BookListForm