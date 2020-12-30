import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup";
import "./PasswordForm.scss"

export default function PasswordForm() {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string()
            .required("La contraseña es obligatorio"),
            newPassword: Yup.string().required("La contraseña es obligatorio").oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required("La contraseña es obligatorio").oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit: async (formValue) => {
          console.log(formValue)
          
          try {
           
          } catch (error) {
            console.log("err formPass", error)
          }
        },
      });

    return (
        <Form className="password-form" onSubmit={formik.handleSubmit} >
            <Form.Input placeholder="Contraseña actual" 
                type="password"
                name="currentPassword" 
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />
            
            <Form.Input 
                type="password"
                placeholder="Nueva contraseña" 
                name="newPassword" 
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />

            <Form.Input 
                type="password"
                placeholder="Repetir nueva contraseña" 
                name="repeatNewPassword" 
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />

            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}

function initialValues() {
    return {
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    };
}