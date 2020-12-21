import React from 'react'
import { Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ImageNoFound from "../../../assets/avatar.png";
import "./RightHeader.scss"

export default function RightHeader() {
    const { auth } = useAuth();
    return (
        <>
            <div className="right-header" >
                <Link to="/" >
                    <Icon name="home" />
                </Link>
                
                <Icon name="plus" />

                <Link to={`/${auth.username}`} >
                    {/* <Icon name="user" /> */}
                    <Image src={ ImageNoFound } avatar />
                </Link>
            </div>
        </>
    )
}
