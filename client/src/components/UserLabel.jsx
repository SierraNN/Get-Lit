import { Label } from "semantic-ui-react"
import UserAvatar from "./UserAvatar"

const UserLabel = ({ user, text, detail }) => {
  return <Label className="creatorLabel">
    <UserAvatar user={user} circular bordered />
    {text || user?.username}
    {detail && <Label.Detail content={detail} />}
  </Label>
}

export default UserLabel