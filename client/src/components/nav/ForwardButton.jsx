import { useNavigate } from "react-router-dom"
import { Button } from "semantic-ui-react"

const ForwardButton = ({ icon = "angle right", ...buttonProps }) => {
  const navigate = useNavigate()
  return (
    <Button icon={icon === null ? undefined : icon} onClick={() => navigate(1)} />
  )
}

export default ForwardButton