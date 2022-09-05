import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
//import { useAuth } from '../../context/AuthContext';
import { Container } from 'semantic-ui-react'
import { Divider, Header, Segment, Modal, Columns } from 'semantic-ui-react'
import { Icon, Menu } from 'semantic-ui-react'
import './Profile.css';
import { useAuth } from '../../context/AuthContext';
import ProfileImage from '../../components/ProfileImage';
import { Dropdown } from 'semantic-ui-react'

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

const Profile = (currentModal, handleModalChange) => {
    const ModalBio = () => (
      <div className="ui modal" id='bio'>
        <i className="close icon"></i>
        <div className="header">
          Profile Picture
        </div>
        <div className="image content">
          <div className="ui medium image">
            <img src="/images/avatar/large/chris.jpg" />
          </div>
          <div className="description">
            <div className="ui header">We've auto-chosen a profile image for you.</div>
            <p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </div>
        </div>
        <div className="actions">
          <div className="ui black deny button">
            Nope
          </div>
          <div className="ui positive right labeled icon button">
            Yep, that's me
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    )
    const ImageExampleCircular = () => (
        <div>
          <Image className="ui bordered middle aligned tiny small circular right floated image"  src='https://easydrawingguides.com/wp-content/uploads/2021/09/Dog-Pixel-Art-step-by-step-drawing-tutorial-step-10.png' size='small' circular />
          <br />
          <ProfileImage />
        </div>
        ) 
    const ContainerExampleContainer = () => (
      <Container>
        <button className="ui basic button right floated">
          <i className="icon user"></i>
          Follow
        </button> 
        <Container>
          <Segment raised>
            <div className="ui justified container">
              <p>
              <Dropdown placeholder='Skills' fluid multiple selection options={options} />
              </p>
            </div>
          </Segment>
          <Segment color='purple'><FriendsContainer /></Segment>
        </Container>
      </Container>
    )
    const showModal = () => (
      <div className="ui grid">
            <div className="four wide column">
              <div className="ui vertical fluid tabular menu">
                <a
                  href="#bio" onClick={() => handleModalChange('Bio')}>
                  Bio
                </a>
                <a
                  href="#fav" onClick={() => handleModalChange('Favorited Books')}>
                  Favorited Books
                </a>
                <a
                  href="#list" onClick={() => handleModalChange('Book Lists')}>
                  Book Lists
                </a>
                <a
                  href="#following" onClick={() => handleModalChange('Following')}>
                  Following
                </a>
              </div>
            </div>
          </div>
    )
    const FriendsContainer = () => (
      <Container>
        <Header>Followers List</Header>
        <div className="ui horizontal list">
          <div className="item">
            <img className="ui mini circular image" src="/images/avatar2/small/molly.png" />
            <div className="content">
              <div className="ui sub header">Molly</div>
            </div>
          </div>
          <br />
          <div className="item">
            <img className="ui mini circular image" src="/images/avatar2/small/elyse.png" />
            <div className="content">
              <div className="ui sub header">Elyse</div>
            </div>
          </div>
          <br />
          <div className="item">
            <img src="/images/avatar2/small/eve.png" className="ui mini circular image" />
            <div className="content">
              <div className="ui sub header">Eve</div>
            </div>
          </div>
        </div>
      </Container>
    )
    const Title = () => (
      <div>
      <button className='edit ui basic button right floated'><i className='cog icon' /></button>
      <Header >Username</Header>
      <ImageExampleCircular />
      </div>
    )
    const [auth, setAuth] = useAuth()
    return (
      <div className="background1">
          <div className="right floated sixteen wide column body">          
            <Segment>
              <Title />
              <Divider clearing/>
              <ContainerExampleContainer />
            </Segment>
          </div>
        </div>
    )
    {auth
      ? <>
      </>
      : <>
      </>}
  }
  
  export default Profile

