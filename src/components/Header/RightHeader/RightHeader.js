import React from 'react'
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/avatar.png";
import "./RightHeader.scss"

export default function RightHeader() {
    const { auth } = useAuth();

    const {data, loading, error } = useQuery(GET_USER, {
        variables: { username: auth.username }
    })

    if(loading || error ) return null;

    const { getUser } = data;

    return (
        <>
            <div className="right-header" >
                <Link to="/" >
                    <Icon name="home" />
                </Link>
                
                <Icon name="plus" />

                <Link to={`/${auth.username}`} >
                    {/* <Icon name="user" /> */}
                    <Image src={ getUser.avatar ? getUser.avatar: ImageNoFound } avatar />
                </Link>
            </div>
        </>
    )
}
