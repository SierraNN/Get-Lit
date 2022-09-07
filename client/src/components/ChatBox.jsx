import { Link } from 'react-router-dom'
import { Container, Icon, Menu, Segment } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';

const ChatBox = (props) => {
  const [auth, setAuth] = useAuth()

  return (
    <Container>
        <Segment>
            <div className="ui link card">

            </div>
        </Segment>
    </Container>
    //   {auth
    //     ? <>
    //     </>
    //     : <>
    //     </>
  )
}

export default ChatBox