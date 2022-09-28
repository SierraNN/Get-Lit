import { Container, Header, Icon, Message, Segment } from "semantic-ui-react"
import BackButton from "../components/nav/BackButton"

const NotFound = (props) => {
  return (
    <div className="background " >
      <Container text className="blue-box">
        <BackButton />
        <Segment basic textAlign="center">
          <Header as='h1' >
            Page Not Found
          </Header>
          <Icon size="massive" name="exclamation circle" color="red" />
        </Segment>
      </Container>
    </div>
  )
}

export default NotFound