import React, { useState } from 'react'
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import userAuth from "../../../hooks/useAuth";
import UserNotFound from "../../UserNotFound";
import ModalBasic from "../../Modal/ModalBasic";
import AvatarForm from "../AvatarForm";
import HeaderProfile from "./HeaderProfile";
import SettingsForm from "../SettingsForm";
import ImageNoFound from "../../../assets/avatar.png";
import "./Profile.scss"

export default function Profile(props) {
    const {username} = props;
    const  [showModal, setShowModal ] = useState(false)
    const [titleModal, setTitleModal] = useState("")
    const [childrenModal, setChildrenModal] = useState(null)
    const { auth } = userAuth();
    // const result = useQuery(GET_USER , {
    const {data, loading, error } = useQuery(GET_USER , {
        variables: { username }
    })
    
    if(loading) return null;
    if(error) return <UserNotFound/>
    
    const {getUser} = data;
    
    
    console.log("getUserr",getUser)

    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil")
                setChildrenModal(
                    <AvatarForm setShowModal={setShowModal} auth={auth} />
                )
                setShowModal(true)
                break;
            case "settings":
                setTitleModal("")
                setChildrenModal(
                    <SettingsForm setShowModal={setShowModal} />
                )
                setShowModal(true)
                break;
            default:
                break;
        }
    }
    
    return (
        <>
            <Grid className="profile" >
                <Grid.Column width={5} className="profile__left" >
                    <Image src={getUser.avatar? getUser.avatar: ImageNoFound} avatar onClick={ () => {if (username === auth.username) handlerModal("avatar")} } />
                </Grid.Column>

                <Grid.Column width={11} className="profile__right" >

                    <HeaderProfile getUser={getUser} auth={auth} handlerModal={handlerModal} />

                    <div>Followers</div>
                    <div className="other" >
                        <p className="name" >{getUser.name}</p>
                        {
                            getUser.sitioWeb && (
                                <a href={getUser.sitioWeb} className="siteWeb" target="_blank" >
                                    {getUser.sitioWeb}
                                </a>
                            )
                        }
                        {
                            getUser.descripcion && (
                                <p className="description" >{getUser.descripcion} </p>
                            )
                        }
                    </div>
                </Grid.Column>
            </Grid>

            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal} >
                {childrenModal}
            </ModalBasic>
        </>
    )
}
