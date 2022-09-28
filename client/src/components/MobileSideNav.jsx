
import { Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import useMediaQuery from "../context/useMediaQuery"
import { useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"

const MobileSideNav = (props) => {
    
  const [auth, setAuth] = useAuth()
  const [updateProfile] = useProfile() // es-lint-ignore-line
  const shouldCollapse = useMediaQuery('(max-width: 500px)')
  const [setIsMobile] = useState(true)

  return (

    <Menu id="mobile-navigation" >

      <Link to="/" label="Home">
        <h1>Home</h1>
      </Link>

      <Link to="/books" label="Books">
        <h1>Home</h1>
      </Link>

      <Link to="/reviews" label="Reviews">
        <h1>Home</h1>
      </Link>

      <Link to='/lists' label="Lists">
        <h1>Home</h1>
      </Link>

      <Link to='/clubs' label="Clubs">
        <h1>Home</h1>
      </Link>

      <Link to='/users' label="Users">
        <h1>Home</h1>
      </Link>

      {auth
        ? <>
          <Link to='/profile' label="Profile">
            <h1>Home</h1>
          </Link>
          <Link label="Log Out" as='div' onClick={() => {
            setAuth(null);
            updateProfile('CLEAR_PROFILE');
            window.location.reload()
          }}>
            <h1>Home</h1>
          </Link>
        </>
        : <>
          <Link to='/login' label="Log In">
            <h1>Home</h1>
          </Link>
        </>
      }
    </Menu>
  )
}

export default MobileSideNav