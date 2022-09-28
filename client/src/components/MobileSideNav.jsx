
import { Menu, List, Header } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { useState } from "react"
import { Link } from "react-router-dom"

const MobileSideNav = (props) => {
    
  const [auth, setAuth] = useAuth()
  const [profile, updateProfile] = useProfile() // es-lint-ignore-line
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div id='mobile-nav'>
      <Menu.Menu position="right">
        <Menu.Item icon='bars' float="right" onClick={() => setIsCollapsed(!isCollapsed)} />
      </Menu.Menu>
      <List className={isCollapsed ? "sub-menu collapsed" : "sub-menu expanded"} divided >
        
        <List.Item>
          <Link to='/'>
            <Header icon="home" content='Home' />
          </Link>
        </List.Item>

        <List.Item to="/books" label="Books">
          <Link to=''>Search</Link>
        </List.Item>
        <List.Item to="/reviews" label="Reviews">
          <Link to=''>Reviews</Link>
        </List.Item>
        <List.Item to='/lists' label="Lists">
          <Link to=''>Lists</Link>
        </List.Item>
        <List.Item to='/clubs' label="Clubs">
          <Link to=''>Clubs</Link>
        </List.Item>
        <List.Item to='/users' label="Users">
          <Link to=''>Users</Link>
        </List.Item>
        {auth
          ? <>
            <List.Item to='/profile' label="Profile">
              <Link to=''>Profile</Link>
            </List.Item>
            <List.Item label="Log Out" as='div' onClick={() => {
              setAuth(null);
              updateProfile('CLEAR_PROFILE');
              window.location.reload()
            }}>
              <Link to=''>Log Out</Link>
            </List.Item>
          </>
          : <>
            <List.Item to='/login' label="Log In">
              <Link to=''>Home</Link>
            </List.Item>
          </>
        }
      </List>
    </div>
  )
  
}

export default MobileSideNav