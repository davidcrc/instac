import React from 'react'
import { Form, Button } from "semantic-ui-react";
import "./PasswordForm.scss"

export default function PasswordForm() {
    return (
        <Form className="password-form" >
            <Form.Input placeholder="Contraseña actual" name="currentPassword" />
            <Form.Input placeholder="Nueva contraseña" name="newPassword" />
            <Form.Input 
                placeholder="Repetir nueva contraseña" 
                name="repeatPassword" 
            />

            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}
