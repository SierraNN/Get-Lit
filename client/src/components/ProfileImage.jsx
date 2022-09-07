
import { Button, Image, Container, Loader, Message } from "semantic-ui-react"
import React, { useState } from "react";

const ProfileImage = () => {

    const [sprite, setSprite] = useState(0) 
    const imgList = [
        "/assets/bg/a.jpg",
        "/assets/bg/b.png",
        "/assets/bg/e.png",
        "/assets/bg/f.png",
        "/assets/bg/g.png",
    // "/assets/Sprites/DarkElf/Character2_face2.png",
    // "/assets/Sprites/DarkElf/Character3_face2.png",
    // "/assets/Sprites/DarkElf/Character4_face2.png",
    // "/assets/Sprites/DarkElf/Character5_face2.png",
    // "/assets/Sprites/DarkElf/Character6_face2.png",
    // "/assets/Sprites/DarkElf/Character7_face2.png",
    // "/assets/Sprites/DarkElf/Character8_face2.png",
    // "/assets/Sprites/Demon/Character1_face2.png",
    // "/assets/Sprites/Demon/Character2_face2.png",
    // "/assets/Sprites/Demon/Character3_face2.png",
    // "/assets/Sprites/Demon/Character4_face2.png",
    // "/assets/Sprites/Demon/Character5_face2.png",
    // "/assets/Sprites/Demon/Character6_face2.png",
    // "/assets/Sprites/Demon/Character7_face2.png",
    // "/assets/Sprites/Demon/Character8_face2.png",
    // "/assets/Sprites/Halfling/Character1_face2.png",
    // "/assets/Sprites/Halfling/Character2_face2.png",
    // "/assets/Sprites/Halfling/Character3_face2.png",
    // "/assets/Sprites/Halfling/Character4_face2.png",
    // "/assets/Sprites/Halfling/Character5_face2.png",
    // "/assets/Sprites/Halfling/Character6_face2.png",
    // "/assets/Sprites/Halfling/Character7_face2.png",
    // "/assets/Sprites/Halfling/Character8_face2.png"
]

    const onClickForward = () => {
        if (sprite == 5){
        setSprite(sprite-4)
        } else {
            setSprite(sprite + 1)
        }
    }
    return (
        <Container>
            <div>
                <Image className=" profileImg circular medium ui image bordered centered" 
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