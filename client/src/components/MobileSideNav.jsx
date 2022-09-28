
import { Menu, List, Header, Button } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { useState } from "react"
import { Link } from "react-router-dom"
import './mobile.sass'
import { LocalState } from '@apollo/client/core/LocalState'

const MobileSideNav = (props) => {
    
  const [auth, setAuth] = useAuth()
  const [profile, updateProfile] = useProfile() // es-lint-ignore-line
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div id='mobile-nav'>
      <Button className='btn' icon='bars' onClick={() => setIsCollapsed(!isCollapsed)} />
      <List id='mobile-nav' className={isCollapsed ? "sub-menu collapsed" : "sub-menu expanded"} divided vertical>
        
        <List.Item>
          <Link to='/'>
            <Header icon="home"/>
          </Link>
        </List.Item>

        <List.Item>
          <Link to='/books'>
            <Header icon='book'/>
          </Link>
        </List.Item>

        <List.Item>
          <Link to='/reviews'>
            <Header icon='comment'/>
          </Link>
        </List.Item>

        <List.Item>
          <Link to='/lists'>
            <Header icon='copy outline'/>
          </Link>
        </List.Item>

        <List.Item>
          <Link to='/clubs'>
            <Header icon='comments icon'/>
          </Link>
        </List.Item>

        <List.Item>
          <Link to='/users'>
            <Header icon='users' />
          </Link>
        </List.Item>

        {auth
          ? <>

            <List.Item>
              <Link to='/profile'>
                <Header icon='user circle'/>
              </Link>
            </List.Item>

            <List.Item as='div' onClick={() => {
              setAuth(null);
              updateProfile('CLEAR_PROFILE');
              window.location.reload()
            }}>
              <Link to='/'>
                <Header icon='sign out'/>
              </Link>
            </List.Item>

          </>
          : <>
            <List.Item>
              <Link to='/login'>
                <Header icon='sign in'/>
              </Link>
            </List.Item>


          </>
        }
      </List>
    </div>
  )
  
}

export default MobileSideNav