
import { Button, Image, Container, Loader, Message } from "semantic-ui-react"
import React, { useState } from "react";
import sprite1 from '../assets/sprite1.jpg';
import sprite2 from '../assets/sprite2.png';
import sprite3 from '../assets/sprite3.jpg';


const ProfileImage = () => {

  

    const onClickForward = () => {
        if (this.state.index + 1 === this.state.imgList.length) {
            this.setState({
                index: 0
            })
        } else {
            this.setState ({
                index: this.state.index +1
            })
        }
    }

    const onClickBack = () => {
        if(this.state.index -1 === -1) {
            this.setState({
                index: this.state.imgList.length - 1
            })
        } else {
            this.setState({
                index: this.state.index - 1
            })
        }
    }

    return (
        <Container>
            <div>
                <Image className="circular small ui image" src={sprite1} />
            </div>

            <button className="1" onClick={() => onClickBack()}>Back</button>
            <button className="2" onClick={() => onClickForward()}>Next</button>
        </Container>
    )
    
}



export default ProfileImage