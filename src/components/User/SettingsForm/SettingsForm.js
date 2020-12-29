import React from 'react'
import { Button } from "semantic-ui-react";
import "./SettingsForm.scss"

export default function SettingsForm(props) {

    const {setShowModal} = props;

    return (
        <div className="settings-form" >
            <Button>Cambiar password</Button>
            <Button>Cambiar email</Button>
            <Button>Descripción</Button>
            <Button>Sitio web</Button>
            <Button>Cerrar sesión</Button>
            <Button onClick={ () => setShowModal(false)} >Cancelar</Button>
        </div>
    )
}
