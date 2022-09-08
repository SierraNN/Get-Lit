
import { Button, Image, Container, Loader, Message, Placeholder } from "semantic-ui-react"
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { useMutation } from "@apollo/client";
import { UPDATE_SPRITE } from "../utils/mutations";

export const imgList = [
    "/assets/bg/a.jpg",
    "/assets/bg/b.png",
    "/assets/bg/e.png",
    "/assets/bg/g.png",
    "/assets/Sprites/c.png",
    "/assets/Sprites/d.png"
]

const ProfileImage = ({ spriteChoice = 0, isOwnProfile = false }) => {
    const [profile, updateProfile] = useProfile()
    const [loading, setLoading] = useState(true)
    const [sprite, setSprite] = useState()

    useEffect(() => {
        if (isOwnProfile) {
            if (profile.spriteChoice !== undefined) {
                setSprite(profile.spriteChoice)
                setLoading(false)
            }
        } else {
            setSprite(spriteChoice)
            setLoading(false)
        }
    }, [isOwnProfile, profile])

    const [updateSprite] = useMutation(UPDATE_SPRITE)
    const onClickForward = async () => {
        let nextSprite = sprite >= imgList.length - 1 ? 0 : sprite + 1
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
            {isOwnProfile && <Button className='spriteBtn' onClick={() => onClickForward()}>
                Next
            </Button>}
        </Container>
    )

}

export default ProfileImage