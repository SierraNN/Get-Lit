
import { Button, Image, Container, Loader, Message } from "semantic-ui-react"
import React, { useState } from "react";

const ProfileImage = () => {

    const [sprite, setSprite] = useState(0) 
    const imgList = [
    "/assets/Sprites/DarkElf/Charater1_face2.png",
    "/assets/Sprites/DarkElf/Character2_face2.png",
    "/assets/Sprites/DarkElf/Character3_face2.png",
    "/assets/Sprites/DarkElf/Character4_face2.png",
    "/assets/Sprites/DarkElf/Character5_face2.png",
    "/assets/Sprites/DarkElf/Character6_face2.png",
    "/assets/Sprites/DarkElf/Character7_face2.png",
    "/assets/Sprites/DarkElf/Character8_face2.png",
    "/assets/Sprites/Demons/Charater1_face2.png",
    "/assets/Sprites/Demons/Charater2_face2.png",
    "/assets/Sprites/Demons/Charater3_face2.png",
    "/assets/Sprites/Demons/Charater4_face2.png",
    "/assets/Sprites/Demons/Charater5_face2.png",
    "/assets/Sprites/Demons/Charater6_face2.png",
    "/assets/Sprites/Demons/Charater7_face2.png",
    "/assets/Sprites/Demons/Charater8_face2.png",
    "/assets/Sprites/Halfling/Charater1_face2.png",
    "/assets/Sprites/Halfling/Charater2_face2.png",
    "/assets/Sprites/Halfling/Charater3_face2.png",
    "/assets/Sprites/Halfling/Charater4_face2.png",
    "/assets/Sprites/Halfling/Charater5_face2.png",
    "/assets/Sprites/Halfling/Charater6_face2.png",
    "/assets/Sprites/Halfling/Charater7_face2.png",
    "/assets/Sprites/Halfling/Charater8_face2.png"
]

    const onClickForward = () => {
        if (sprite == 24){
        setSprite(0)
        } else {
            setSprite(sprite + 1)
        }
    }
    return (
        <Container>
            <div>
                <Image style={{width: '200px', height: '350px'}} className="circular medium ui image bordered centered" 
                src={imgList[sprite]} 
                />
            </div>
            <Button className='2 left floated button' onClick={() => onClickForward()}>
                Next
            </Button>
            <br /><br />
        </Container>
    )
    
}

export default ProfileImage