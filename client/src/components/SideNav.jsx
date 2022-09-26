import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const SideNav = (props) => {
  const [auth, setAuth] = useAuth()
  const [profile, updateProfile] = useProfile()


  return (
    <div>

    <Menu id="main-navigation" vertical>
      <Link to="/">
        <span className="hovertext" data-hover="Home">
          <Menu.Item><Icon name='home' /></Menu.Item>
        </span>
      </Link>

      <Link to="/books">
        <span className="hovertext" data-hover="Books">
          <Menu.Item><Icon name="book" /></Menu.Item>
        </span>
      </Link>

      <Link to="/reviews">
        <span className="hovertext" data-hover="Reviews">
          <Menu.Item><Icon name="comment" /></Menu.Item>
        </span>
      </Link>

      <Link to="/lists">
        <span className="hovertext" data-hover="Lists">
          <Menu.Item><Icon name="list" /></Menu.Item>
        </span>
      </Link>

      <Link to="/clubs">
        <span className="hovertext" data-hover="Clubs">
          <Menu.Item><Icon name="users" /></Menu.Item>
        </span>
      </Link>
      <Link to="/users">
        <span className="hovertext" data-hover="Users">
          <Menu.Item><Icon name="user" /></Menu.Item>
        </span>
      </Link>
      
      {auth
        ? <>
          <Link to="/profile">
            <span className="hovertext" data-hover="Profile">
              <Menu.Item><Icon name="user circle" /></Menu.Item>
            </span>
          </Link>
          <Link to="/login">
            <span className="hovertext" data-hover="Logout">
              <Menu.Item onClick={() => { setAuth(null); updateProfile('CLEAR_PROFILE') }}><Icon name="sign out" /></Menu.Item>
            </span>
          </Link>
        </>
        : <>
          <Link to="/login">
            <span className="hovertext" data-hover="Login">
              <Menu.Item><Icon name='sign in' /></Menu.Item>
            </span>
          </Link>
        </>}
    </Menu>
    </div>
  )
}

export default SideNav