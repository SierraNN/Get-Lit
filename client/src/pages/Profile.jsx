import { useProfile } from "../context/ProfileContext"

const Profile = (props) => {
  const [profile] = useProfile()
  console.log(profile)
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile