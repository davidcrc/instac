import React from 'react'
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import "./SettingsForm.scss"

export default function SettingsForm(props) {

    const {setShowModal} = props;

    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onLogOut = () => {
        client.clearStore();
        logout();
        history.push("/");
    }

    return (
        <div className="settings-form" >
            <Button>Cambiar password</Button>
            <Button>Cambiar email</Button>
            <Button>Descripción</Button>
            <Button>Sitio web</Button>
            <Button onClick={onLogOut} >Cerrar sesión</Button>
            <Button onClick={ () => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}
