import { Container, Header, Message } from 'semantic-ui-react'
import { FormProvider, useForm } from '@codewizard-dt/use-form-hook'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../utils/mutations'
import { useAuth } from '../../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Login.sass"

const Login = (props) => {
  const { Form } = useForm()
  const [auth, setAuth] = useAuth() // eslint-disable-line
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
      <Container className="blue-box">
        <div id="Login" className="ui grid">
          <div className="six wide column ">
            <img alt='logo' className='ui image' src='/assets/logo/get-lit-transparent.png' />
          </div>
          <div className="ten wide column">
            <div className="form-wrap">
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
            </div>

          </div>
        </div>
      </Container>
    </div>
  )
}

export default Login