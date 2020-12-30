import React from 'react'
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import useAuth from "../../../hooks/useAuth";
import PasswordForm from "../PasswordForm";
import "./SettingsForm.scss"

export default function SettingsForm(props) {

    // Podemos reutilizar el mismo modal para setear nuevas vistar dentro del mismo modal
    const {setShowModal, setTitleModal, setChildrenModal } = props;

    const history = useHistory();
    const client = useApolloClient();
    const { logout } = useAuth();

    const onChangePassword = (params) => {
        // console.log("Cambiar pass")
        setTitleModal("Cambiar la contraseña")
        setChildrenModal(
            <PasswordForm/>
        )
    }    

    const onLogOut = () => {
        client.clearStore();
        logout();
        history.push("/");
    }

    return (
        <div className="settings-form" >
            <Button onClick={onChangePassword}  >Cambiar password</Button>
            <Button onClick={null} >Cambiar email</Button>
            <Button onClick={null} >Descripción</Button>
            <Button onClick={null} >Sitio web</Button>
            <Button onClick={onLogOut} >Cerrar sesión</Button>
            <Button onClick={ () => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}
