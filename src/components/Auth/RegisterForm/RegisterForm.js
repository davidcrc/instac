import React from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../gql/user";
import "./RegisterForm.scss";

export default function RegisterForm(props) {

    const {setshowLogin} =props;
    // LLamando a GQL : [register = es el nombre de la mutation]
    const [register] = useMutation(REGISTER);

    // console.log(props)
    const formik = useFormik({
        initialValues: initialValues() ,
        validationSchema: Yup.object({
            name: Yup.string().required("Nombre obligatorio"),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/, "El nombre del usuario no puede tener espacio").required("Nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es obligatorio"),
            password: Yup.string().required("Contraseña obligatoria").oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales"),
            repeatPassword: Yup.string().required("Contraseña obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no son iguales")
        }),
        onSubmit: async (formData) => {
            console.log("Formulario recibido")
            // console.log(formData)
            try {
                
                const newUser = formData;
                delete newUser.repeatPassword;
                // console.log(newUser)

                const result = await register({
                    variables: {
                        input: newUser
                    }
                })

                console.log(result)
            } catch (error) {
                console.log("err ",error.message)
            }
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
                    name="name" 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && true}      // Descomentar el true para visualizar el mensg
                />
                <Form.Input
                    type="text"
                    placeholder="Nombre de usuario"
                    name="username" 
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.errors.username && true}
                />
                <Form.Input
                    type="text"
                    placeholder="Correo electronico"
                    name="email" 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Contraseña"
                    name="password" 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && true}
                />
                <Form.Input
                    type="password"
                    placeholder="Repetir Contraseña"
                    name="repeatPassword" 
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}
                />

                <Button type="submit" className="btn-submit"> Registrar</Button>
                
                {/* <Button type="button" onClick={formik.handleReset} > Reiniciar</Button> */}
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