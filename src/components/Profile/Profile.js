import React from 'react'
import { Grid, Image } from "semantic-ui-react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../gql/user";
import UserNotFound from "../../components/UserNotFound";
import ImageNoFound from "../../assets/avatar.png";
import "./Profile.scss"

export default function Profile(props) {
    const {username} = props;
    // const result = useQuery(GET_USER , {
    const {data, loading, error } = useQuery(GET_USER , {
        variables: { username }
    })
    
    if(loading) return null;
    if(error) return <UserNotFound/>
    
    const {getUser} = data;
    
    
    console.log(getUser)
    
    return (
        <>
            <Grid className="profile" >
                <Grid.Column width={5} className="profile__left" >
                    <Image src={ImageNoFound} avatar />
                </Grid.Column>

                <Grid.Column width={11} className="profile__right" >
                    <div>Header profile</div>
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
        </>
    )
}
