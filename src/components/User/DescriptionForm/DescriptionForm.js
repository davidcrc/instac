import React from 'react'
import { Form, Button, TextArea } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./DescriptionForm.scss"

export default function DescriptionForm(props) {
    console.log(props)
    const {setShowModal, currentDescription, refetch} = props;
    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: {
            descripcion: currentDescription || "",
        },
        validationSchema: Yup.object({
            descripcion: Yup.string().required("Descripcion requerida")
        }),
        onSubmit: async (formData) => {
        //   console.log(formData)
          
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
        <Form className="description-form" onSubmit={formik.handleSubmit}>
            <TextArea
                placeholder="Descripcion"
                name="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                className={formik.errors.descripcion && "error" }
            />

            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}
