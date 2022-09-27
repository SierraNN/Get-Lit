import { useReducer } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { Icon, ItemContent, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const menuReducer = (state, { type, payload }) => {
  switch (type) {
    case 'HOVER':
      return { ...state, hover: payload }
    case 'PATH':
      return { ...state, path: payload, hover: null }
    case 'OPEN_MENU':
      return { ...state, open: true }
    case 'CLOSE_MENU':
      return { ...state, open: false, hover: null }
    default:
      return state
  }
}

const SideNav = (props) => {
  const [auth, setAuth] = useAuth()
  const [profile, updateProfile] = useProfile() // es-lint-ignore-line
  const [menuHover, setMenuHover] = useState(false)
  const location = useLocation()
  const { pathname } = location

  const [menu, menuDispatch] = useReducer(menuReducer, {
    open: false,
    hover: null,
    path: pathname
  })

  useEffect(() => {
    menuDispatch({ type: 'PATH', payload: pathname })
  }, [pathname])

  const HoverLink = ({ to, label, children, ...itemProps }) => {
    const active = to === '/' ? menu.path === '/' : menu.path.includes(to)
    const hover = menu.hover === to
    const Item = () => (
      <Menu.Item
        className={active ? 'active' : undefined}
        onMouseEnter={() => {
          if (menu.hover !== to) menuDispatch({ type: 'HOVER', payload: to })
        }}
        {...itemProps}
      >
        {(menu.open && (active || hover)) && <ItemContent content={label} />}
        {children}
      </Menu.Item>
    )
    return to ? (
      <Link to={to}>
        <Item />
      </Link>
    ) : <Item />

  }

  return (
    <Menu id="main-navigation" vertical
      className={menu.open ? 'open' : undefined}
      onMouseEnter={() => { if (!menu.open) menuDispatch({ type: 'OPEN_MENU' }) }}
      onMouseLeave={() => menuDispatch({ type: 'CLOSE_MENU' })}>

      <HoverLink to="/" label="Home">
        <Icon name='home' />
      </HoverLink>

      <HoverLink to="/books" label="Books">
        <Icon name="book" />
      </HoverLink>

      <HoverLink to="/reviews" label="Reviews">
        <Icon name="comment" />
      </HoverLink>

      <HoverLink to='/lists' label="Lists">
        <Icon name="list" />
      </HoverLink>

      <HoverLink to='/clubs' label="Clubs">
        <Icon name="users" />
      </HoverLink>

      <HoverLink to='/users' label="Users">
        <Icon name="user" />
      </HoverLink>

      {auth
        ? <>
          <HoverLink to='/profile' label="Profile">
            <Icon name="user circle" />
          </HoverLink>
          <HoverLink label="Log Out" as='div' onClick={() => {
            setAuth(null);
            updateProfile('CLEAR_PROFILE');
            window.location.reload()
          }}>
            <Icon name="sign out" />
          </HoverLink>
        </>
        : <>
          <HoverLink to='/login' label="Log In">
            <Icon name='sign in' />
          </HoverLink>
        </>
      }
    </Menu>
  )
}

export default SideNav