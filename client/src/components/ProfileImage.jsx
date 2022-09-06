
import { Button, Image, Container, Loader, Message } from "semantic-ui-react"
import React, { useState } from "react";

const ProfileImage = () => {

    const [sprite, setSprite] = useState(0) 
    const imgList = ['/assets/sprite1.png','/assets/sprite2.png','/assets/sprite3.png']

    const onClickForward = () => {
        if (sprite == 2){
        setSprite(0)
        } else {
            setSprite(sprite + 1)
        }
    }
    return (
        <Container>
            <div>
                <Image className="circular small ui image" 
                src={imgList[sprite]} 
                />
            </div>
            <button className="2" onClick={() => onClickForward()}>Next</button>
        </Container>
    )
    
}

export default ProfileImage