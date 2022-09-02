import { Link } from 'react-router-dom'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext';

const SideNav = (props) => {
  const [auth, setAuth] = useAuth()

  return (
    <Menu id="main-navigation" vertical>
      <Link to="/">
        <Menu.Item><Icon name='home' />Home</Menu.Item>
      </Link>
      {auth
        ? <>
          <Link to="/profile">
            <Menu.Item><Icon name="user" />Profile</Menu.Item>
          </Link>
          <Menu.Item onClick={() => setAuth(null)}>
            <Icon name="sign out" />Log Out
          </Menu.Item>
        </>
        : <>
          <Link to="/login">
            <Menu.Item><Icon name='sign in' />Login</Menu.Item>
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