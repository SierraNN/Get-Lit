import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';

const SideNav = (props) => {
  const [auth, setAuth] = useAuth()

  return (
    <Menu id="main-navigation" vertical>
      <Link to="/">
      <span class="hovertext" data-hover="Home">
      <Menu.Item><Icon name='home' /></Menu.Item>
      </span>
      </Link>

      <Link to="/books">
      <span class="hovertext" data-hover="Books">
        <Menu.Item><Icon name="file alternate" /></Menu.Item>
      </span>
      </Link>

      <Link to="/reviews">
      <span class="hovertext" data-hover="Reviews">
        <Menu.Item><Icon name="comment" /></Menu.Item>
      </span>
      </Link>

      <Link to="/lists">
      <span class="hovertext" data-hover="Lists">
        <Menu.Item><Icon name="list" /></Menu.Item>
      </span>
      </Link>

      <Link to="/clubs">
      <span class="hovertext" data-hover="Clubs">
        <Menu.Item><Icon name="users" /></Menu.Item>
      </span>
      </Link>
      {auth
        ? <>
          <Link to="/profile">
          <span class="hovertext" data-hover="Profile">
            <Menu.Item><Icon name="user" /></Menu.Item>
            </span>
          </Link>
          <Menu.Item onClick={() => setAuth(null)}>
          <span class="hovertext" data-hover="Logout">
            <Icon name="sign out" />
          </span>
          </Menu.Item>
        </>
        : <>
          <Link to="/login">
          <span class="hovertext" data-hover="Login">
            <Menu.Item><Icon name='sign in' /></Menu.Item>
          </span>
          </Link>
        </>}
    </Menu>
  )
  // return (
  //   <div id="main-navigation">
  //     <ul>
  //       <li>
  //         <a href="javascript:void(0)" className="wattpad-logo">Home</a>
  //       </li>
  //       <li>
  //         <a href="javascript:void(0)" className="entypo-layout">Dashboard</a>
  //       </li>
  //       <li>
  //         <a href="javascript:void(0)" className="entypo-map">Discover</a>
  //       </li>
  //       <li>
  //         <a href="javascript:void(0)" className="entypo-users">My Friends</a>
  //       </li>
  //       <li>
  //         <a href="javascript:void(0)" className="entypo-archive">My Books</a>
  //       </li>
  //       <li>
  //         <a href="javascript:void(0)" className="entypo-mail">Share</a>
  //       </li>
  //     </ul>
  //   </div>
  // )
}

export default SideNav