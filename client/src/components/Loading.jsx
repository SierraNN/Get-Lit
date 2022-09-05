import { Loader, Message } from "semantic-ui-react"
import './Loading.sass'

const Loading = ({ message = "Loading", children }) => {
  return (
    <Message className="loading">
      <Loader active>
        {message}
        {children}
      </Loader>
    </Message>
  )
}

export default Loading