import { useForm } from "@codewizard-dt/use-form-hook"
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ userCanPost = null, textAreaLabel = "Post a comment", onSubmit, disabledMessage }) => {
  const [auth] = useAuth()
  const { Form, clearData } = useForm()
  return userCanPost !== null ? userCanPost : auth
    ? <Form submit={onSubmit} respond={clearData} fields={[
      { name: "text", label: textAreaLabel, control: "textarea", required: true }
    ]} />
    : disabledMessage
}

export default CommentForm