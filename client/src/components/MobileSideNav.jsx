
import { List, Button, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

const MobileSideNav = (props) => {
    
  const [auth, setAuth] = useAuth()
  const [updateProfile] = useProfile() // es-lint-ignore-line
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <>
      <Button icon='bars'  onClick={() => setIsCollapsed(!isCollapsed)} />
      <List className={isCollapsed ? "sub-menu collapsed" : "sub-menu expanded"} divided >
        <Link to="/" label="Home">
          <h1>Home</h1>
        </Link>
        <Link to="/books" label="Books">
          <h1>Search</h1>
        </Link>
        <Link to="/reviews" label="Reviews">
          <h1>Reviews</h1>
        </Link>
        <Link to='/lists' label="Lists">
          <h1>Lists</h1>
        </Link>
        <Link to='/clubs' label="Clubs">
          <h1>Clubs</h1>
        </Link>
        <Link to='/users' label="Users">
          <h1>Users</h1>
        </Link>
        {auth
          ? <>
            <Link to='/profile' label="Profile">
              <h1>Profile</h1>
            </Link>
            <Link label="Log Out" as='div' onClick={() => {
              setAuth(null);
              updateProfile('CLEAR_PROFILE');
              window.location.reload()
            }}>
              <h1>Logout</h1>
            </Link>
          </>
          : <>
            <Link to='/login' label="Log In">
              <h1>Login</h1>
            </Link>
          </>
        }
      </List>
    </>
  )
  
}

export default MobileSideNav
  