import { useNavigate } from "react-router-dom"
import { Button } from "semantic-ui-react"

const BackButton = ({ text = 'Back', icon = "angle left", ...buttonProps }) => {
  const navigate = useNavigate()
  return (
    <Button icon={icon === null ? undefined : icon} content={text} onClick={() => navigate(-1)} />
  )
}

export default BackButton