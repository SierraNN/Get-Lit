
import { Button, Image, Container, Loader, Message, Placeholder } from "semantic-ui-react"
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { useMutation } from "@apollo/client";
import { UPDATE_SPRITE } from "../utils/mutations";

const ProfileImage = ({ user, spriteChoice = 0, editable = false }) => {
    const [profile, updateProfile] = useProfile()
    const [loading, setLoading] = useState(user ? false : true)
    const [sprite, setSprite] = useState()

    useEffect(() => {
        if (!user && profile.spriteChoice !== undefined) {
            setSprite(profile.spriteChoice)
            setLoading(false)
        }
    }, [user, profile])

    const imgList = [
        "/assets/bg/a.jpg",
        "/assets/bg/b.png",
        "/assets/bg/e.png",
        "/assets/bg/g.png",
        "/assets/Sprites/c.png",
        "/assets/Sprites/d.png"
    ]

    const [updateSprite] = useMutation(UPDATE_SPRITE)
    const onClickForward = async () => {
        let nextSprite = sprite === 6 ? 0 : sprite + 1
        setSprite(nextSprite)
        const { data } = await updateSprite({ variables: { spriteChoice: nextSprite } })
        if (data?.updateSprite) updateProfile('SET_PROFILE', { spriteChoice: nextSprite })
    }
    return (
        <Container>
            <div>
                {!loading ? (
                    <Image className=" profileImg circular medium ui image bordered centered"
                        src={imgList[sprite]}
                    />
                ) : (
                    <div className="ui placeholder profileImage">
                        <div className="profileImg circular medium ui image bordered centered"></div>
                    </div>
                )}

            </div>
            {editable && <Button className='spriteBtn' onClick={() => onClickForward()}>
                Next
            </Button>}
        </Container>
    )

}

export default ProfileImage