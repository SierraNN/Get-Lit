import { Container, Header } from 'semantic-ui-react'
import { FormProvider, useForm } from '@codewizard-dt/use-form-hook'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const { Form } = useForm()
  const [auth, setAuth] = useAuth()
  const [login] = useMutation(LOGIN)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    return login({ variables: data })
  }
  const onResponse = async ({ data }) => {
    if (data && data.login) setAuth(data.login.token)
  }
  return (
    <Container>
      <Header>Login</Header>
      <FormProvider>
        <Form submit={onSubmit} respond={onResponse} fields={[
          { name: 'username', required: true },
          { name: 'password', type: 'password', required: true }
        ]} buttons={[
          { content: 'Register', onClick: () => navigate('/register') }
        ]} />
      </FormProvider>
    </Container>
  )
}

export default Login