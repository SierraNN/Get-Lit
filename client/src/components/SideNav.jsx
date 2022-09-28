import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Icon, ItemContent, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const SideNav = (props) => {
  const [auth, setAuth] = useAuth()
  const [profile, updateProfile] = useProfile() // es-lint-ignore-line
  const [menuHover, setMenuHover] = useState(false)
  const location = useLocation()
  const { pathname } = location


  const HoverLink = ({ to, label, children, ...itemProps }) => {
    const [hover, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useEffect(() => {
      if (to === '/') setActive(pathname === '/')
      else if (to) setActive(pathname.includes(to))
    }, [pathname])
    const Item = () => (
      <Menu.Item
        className={active ? 'active' : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false) }}
        {...itemProps}
      >
        {(hover || menuHover && active) && <ItemContent content={label} />}
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
      onMouseEnter={() => { console.log(menu); if (menu.windowFocus && !menu.open) menuDispatch({ type: 'OPEN_MENU' }) }}
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