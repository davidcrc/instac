import React from 'react'
import { Form, Button } from "semantic-ui-react";
import "./EmailForm.scss"

export default function EmailForm(props) {

    const {setShowModal} = props;

    return (
        <Form className="email-form" >
            <Form.Input
                placeholder="Nuevo email"
                name="email"
            />

            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}
