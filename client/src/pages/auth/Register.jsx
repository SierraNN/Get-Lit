import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Container, Header } from "semantic-ui-react"
import { useAuth } from "../../context/AuthContext"
import { ADD_USER } from "../../utils/mutations"

const Register = (props) => {
  const [auth, setAuth] = useAuth()
  const { Form } = useForm()
  const [addUser] = useMutation(ADD_USER)

  const onSubmit = async ({ username, email, password, password_confirmation }) => {
    if (password !== password_confirmation) {
      return { errors: { password_confirmation: 'Does not match password' } }
    } else {
      return addUser({
        variables: { username, email, password }
      })
    }
  }
  const onResponse = async ({ data, error, errors }) => {
    if (data && data.addUser) setAuth(data.addUser.token)
  }

  return (
    <div className='background'>
      <Container className= "ui container1">
      <div class="ui grid">
        <div class="six wide column left floated">
          <img className='ui image' src='/assets/11.png' />
        </div>
        <div class="ten wide column left floated">
          <br />
          <Header>Register</Header>
          <FormProvider>
            <Form submit={onSubmit} respond={onResponse} fields={[
              { name: 'username', required: true },
              { name: 'email', required: true },
              {
                name: '', widths: 'equal', fields: [
                  { name: 'password', type: 'password', required: true },
                  { name: 'password_confirmation', type: 'password', required: true }
                ]
              }
            ]} />
          </FormProvider>
        </div>
      </div>
    </Container>
    </div>
  )
}

export default Register