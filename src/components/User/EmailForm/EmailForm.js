import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./EmailForm.scss"

export default function EmailForm(props) {
    // console.log(props)
    const {setShowModal, currentEmail, refetch} = props;
    const [updateUser] = useMutation(UPDATE_USER)

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
            await updateUser({
                variables: {
                    input: formData
                }
            })
            // console.log(result)
            refetch();              // Actualiza la query (GET_USER desde el Server) que se define en profile => SettignForm y llega aqui
            setShowModal(false)

        } catch (error) {
            console.log("err formEmail", error)
            toast.error("Error al actualizar email")
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
