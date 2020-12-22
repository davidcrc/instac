import React from 'react'
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import notFound from "../../assets/notFound.png";
import "./UserNotFound.scss"

export default function UserNotFound() {
    return (
        <div className="user-not-found" >
            <p>Usuario no encontrado</p>
            <p>Es posible que el enlace seguido sea incorrecto o que el usuario ya no este disponible.</p>

            <Image src={notFound}  />
            <Link to="/" >Volver al inicio.</Link>
        </div>
    )
}
