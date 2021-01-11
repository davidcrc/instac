import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./SiteWebForm.scss"

export default function SiteWebForm(props) {
    // console.log(props)
    const {setShowModal, currentSiteWeb, refetch} = props;
    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: {
            sitioWeb: currentSiteWeb || "",
        },
        validationSchema: Yup.object({
            sitioWeb: Yup.string().required("Sitio web requerido")
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
            console.log("err formSiteWeb", error)
            toast.error("Error al actualizar sitio web")
          }
        },
    });

    return (
        <Form className="site-web-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                placeholder="URL web" 
                name="sitioWeb"
                value={formik.values.sitioWeb}
                onChange={formik.handleChange}
                error={formik.errors.sitioWeb }
                />

            <Button type="submit" className="btn-submit" >Actualizar</Button>
        </Form>
    )
}
