import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Container, Header } from "semantic-ui-react"
import { useAuth } from "../../context/AuthContext"
import { ADD_USER } from "../../utils/mutations"

const Register = (props) => {
  const [auth, setAuth] = useAuth() // eslint-disable-line
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
      <Container className="blue-box">
        <div id="Register" className="ui stackable grid">
          <div className="six wide column ">
            <img alt='logo' className='ui image' src='/assets/logo/get-lit-transparent.png' />
          </div>
          <div className="ten wide column ">
            <div className="form-wrap">
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
        </div>
      </Container>
    </div>
  )
}

export default Register