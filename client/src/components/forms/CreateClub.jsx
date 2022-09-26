import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Header, TextArea } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext";
import { CREATE_CLUB } from '../../utils/mutations';

const ClubListForm = (props) => {
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const navigate = useNavigate()
  const [createClub] = useMutation(CREATE_CLUB)

  const onSubmit = async (clubInfo) => {
    const club = { ...clubInfo }
    if (club.tags === '') club.tags = []
    else club.tags = club.tags.split(',')
    return createClub({
      variables: { club }
    })
  }
  const onResponse = async ({ data }) => {
    if (data?.createClub) {
      updateProfile('ADD_CLUB', data.createClub)
      navigate(`/clubs/${data.createClub._id}`)
    }
  }

  return (
    <div className="background3">
      <Container className="container1">
        <FormProvider>
          <Header as='h1'>New Book Club</Header>
          <Form submit={onSubmit} respond={onResponse} fields={[
            { name: 'name', required: true },
            { name: 'description', control: TextArea, required: true },
            { name: 'tags', label: 'Tags (comma separated)' }
          ]} submitBtnText="Create Book Club" />
        </FormProvider>
      </Container>
    </div>
  )
}

export default ClubListForm