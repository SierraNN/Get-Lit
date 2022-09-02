import { Container, Header } from 'semantic-ui-react'
import { FormProvider, useForm } from '@codewizard-dt/use-form-hook'
import './Login.sass'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutation'
import { useAuth } from '../context/AuthContext'

const Login = (props) => {
  const { Form } = useForm()
  const [auth, setAuth] = useAuth()
  const [login] = useMutation(LOGIN)
  // const submit = async (data) => {
  //   return login(data)
  // }
  const onSubmit = async (data) => {
    return login({ variables: data })
  }
  const onResponse = async ({ data }) => {
    if (data.login) setAuth(data.login.token)
  }
  return (
    <Container>
      <Header>Login</Header>
      <FormProvider>
        <Form submit={onSubmit} respond={onResponse} fields={[
          { name: 'username', required: true },
          { name: 'password', type: 'password', required: true }
        ]} />
      </FormProvider>
    </Container>
  )
}

export default Login