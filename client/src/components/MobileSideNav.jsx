import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon, ItemContent, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const SideNav = (props) => {
  const [auth, setAuth] = useAuth()
  const [profile, updateProfile] = useProfile() // es-lint-ignore-line
  const location = useLocation()
  const { pathname } = location

  return (
    <Menu id="main-navigation" vertical>
      <Link to="/" label="Home">
        <Icon name='home' />
      </Link>

      <Link to="/books" label="Books">
        <Icon name="book" />
      </Link>

      <Link to="/reviews" label="Reviews">
        <Icon name="comment" />
      </Link>

      <Link to='/lists' label="Lists">
        <Icon name="list" />
      </Link>

      <Link to='/clubs' label="Clubs">
        <Icon name="users" />
      </Link>

      <Link to='/users' label="Users">
        <Icon name="user" />
      </Link>

      {auth
        ? <>
          <Link to='/profile' label="Profile">
            <Icon name="user circle" />
          </Link>
          <Link label="Log Out" as='div' onClick={() => {
            setAuth(null);
            updateProfile('CLEAR_PROFILE');
            window.location.reload()
          }}>
            <Icon name="sign out" />
          </Link>
        </>
        : <>
          <Link to='/login' label="Log In">
            <Icon name='sign in' />
          </Link>
        </>
      }
    </Menu>
  )
}

export default SideNav