import React from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import "./RegisterForm.scss";

export default function RegisterForm(props) {

    const {setshowLogin} =props;
    // console.log(props)
    const formik = useFormik({
        initialValues: initialValues() ,
        validationSchema: null,
        onSubmit: (formValues) => {
            console.log("Formulario recibido")
            console.log(formValues)
        }
    })

    // const onSubmit = () => {
    //     console.log("Datos del formulario enviado");
    // }

    return (
        <>
            <h2 className="register-form-title" >Registrate para ver fotos y videos de tus amigos!</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit} >
                <Form.Input
                    type="text"
                    placeholder="Nombre y apellido"
                    name="name" onChange={formik.handleChange}
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username" onChange={formik.handleChange}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electronico"
                    name="email" onChange={formik.handleChange}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password" onChange={formik.handleChange}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeatPassword" onChange={formik.handleChange}
                />

                <Button type="submit" className="btn-submit"> Registrar</Button>
            </Form>
        </>
    )
}

function initialValues(){
    return {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""
    }
}