
import { Form, FormField, Image } from 'semantic-ui-react';
//import { useAuth } from '../../context/AuthContext'
import { Container } from 'semantic-ui-react';
import { Divider, Header, Segment, Modal, Columns, Button } from 'semantic-ui-react';
import { Icon, Menu } from 'semantic-ui-react';
import './Profile.css';
import { useAuth } from '../../context/AuthContext';
import ProfileImage from '../../components/ProfileImage';
import { Dropdown } from 'semantic-ui-react';
import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';
import Bio from '../Bio'



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

const Profile = () => {
    const ImageExampleCircular = () => (
        <div>
          <Image className="imageborder ui bordered middle aligned tiny small circular right floated image"  src='https://easydrawingguides.com/wp-content/uploads/2021/09/Dog-Pixel-Art-step-by-step-drawing-tutorial-step-10.png' size='small' circular />
        </div>
    ) 
    const GenresContainer = () => (
        <Container>
          <Segment raised>
            <GenresDisplay/>
          </Segment>
        </Container>
    )
    const GenresDisplay = () => (
      //need to link the dropdown selections to displayh here
      <>
      <i className='tag icon' />
      <a> Fantasy</a>
      <a> Mystery</a>
      <a> Suspense</a>
      <a> Poetry</a>
      <a> Historical</a>
      </>
    )
    const GenresSelect = () => (
      <p>
      <i className='tag icon' />
      <Dropdown placeholder='Genres' fluid multiple selection options={options} />
      </p>
    )
    const FriendsContainer = () => (
      //edit this so it renders dynamically
      <Container>
        <Header>Followers List</Header>
        <div className="ui vertical list">
          <div className="item">
            <img className="ui mini circular image" src="" />
            <div className="content">
              <div className="ui sub header">Molly</div>
            </div>
          </div>
          <br />
          <div className="item">
            <img className="ui mini circular image" src="" />
            <div className="content">
              <div className="ui sub header">Elyse</div>
            </div>
          </div>
          <br />
          <div className="item">
            <img src="" className="ui mini circular image" />
            <div className="content">
              <div className="ui sub header">Eve</div>
            </div>
          </div>
        </div>
      </Container>
    )
    const save = (value) => {alert(value)}
    const cancel = () => {alert("Cancelled")}
    const BioContainer = () => (
      <Container>
        <Header>Bio</Header>
        <Bio />
      </Container>
    )
    const BioContainerEdit = () => (
      <Container />
    )
    const FavoritesContainer = () => (
      //edit this so it renders dynamically
      <Container>
        <Header>Favorites</Header>
        <div className="ui vertical list">
          <div className="ui sub">Insert Favorites Here</div>
        </div>
        <br />

      </Container>
    )
    const BookListContainer = () => (
      //edit this so it renders dynamically
      <Container>
        <Header>Book Lists</Header>
        <div className="ui vertical list">
          <div className="ui sub">Insert Lists Here</div>
        </div>
        <br />

      </Container>
    )
    const Title = () => (
      <div>
      <Header >Username</Header>
      <ImageExampleCircular />
      <br /> <br /> <br /> <br /> <br />
      <Button basic onClick={() => {console.log('Hi')}}>
          <i className="icon user"></i>
          Follow
      </Button> 
      </div>
    )
    return (
      
      <div className="background1">
          <div className="right floated sixteen wide column body">          
            <Segment>
              <Title />
              <Divider clearing/>
              <GenresContainer />
              <Segment color='brown'><BioContainer /></Segment>
              <Segment color='brown'><FriendsContainer /></Segment>
              <Segment color='brown'><BookListContainer /></Segment>
              <Segment color='brown'><FavoritesContainer /></Segment>
            </Segment>

          </div>
        </div>
    )
    // {auth
    //   ? <>
    //   <button className='edit ui basic button right floated'><i className='cog icon' /></button>
    //   <ProfileImage />
    //   <GenresSelect />
    //   </>
    //   : <>
    //   </>}
  }
  
  export default Profile

