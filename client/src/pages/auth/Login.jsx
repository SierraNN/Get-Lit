import { Container, Header, Message } from 'semantic-ui-react'
import { FormProvider, useForm } from '@codewizard-dt/use-form-hook'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import { useAuth } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = (props) => {
  const { Form } = useForm()
  const [auth, setAuth] = useAuth()
  const [login] = useMutation(LOGIN)
  const { state } = useLocation()
  const message = state && state.message
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    return login({ variables: data })
  }
  const onResponse = async ({ data }) => {
    if (data && data.login) setAuth(data.login.token)
  }
  return (
    <div className='background'>
    <Container className= "ui container1">
      <Header>Login</Header>
      {message && <Message content={message} />}
      <FormProvider>
        <Form submit={onSubmit} respond={onResponse} fields={[
          { name: 'username', required: true },
          { name: 'password', type: 'password', required: true }
        ]} buttons={[
          { content: 'Register', onClick: () => navigate('/register') }
        ]} />
      </FormProvider>
    </Container>
    </div>
  )
}

export default Login