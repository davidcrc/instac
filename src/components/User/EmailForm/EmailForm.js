import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { toast } from "react-toastify";
// import { useMutation } from "@apollo/client";
// import { UPDATE_USER } from "../../../gql/user";
import "./EmailForm.scss"

export default function EmailForm(props) {
    // console.log(props)
    const {setShowModal, currentEmail} = props;

    const formik = useFormik({
        initialValues: {
            email: currentEmail || "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Email requerido")
        }),
        onSubmit: async (formData) => {
          console.log(formData)
          
          try {


        } catch (error) {
            console.log("err formEmail", error)
            toast.error("Error al cambiar email")
          }
        },
    });

    return (
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                placeholder="Nuevo email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email }
            />

            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}
