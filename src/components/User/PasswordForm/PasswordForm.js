import React from 'react'
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik"
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../../gql/user";
import "./PasswordForm.scss"

export default function PasswordForm(props) {

    const {onLogOut} = props;
    const [updateUser] = useMutation(UPDATE_USER)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string()
            .required("La contraseña es obligatorio"),
            newPassword: Yup.string().required("La contraseña es obligatorio").oneOf([Yup.ref("repeatNewPassword")]),
            repeatNewPassword: Yup.string().required("La contraseña es obligatorio").oneOf([Yup.ref("newPassword")]),
        }),
        onSubmit: async (formValue) => {
        //   console.log(formValue)
          
          try {
              const result = await updateUser({
                  variables: {
                      input: {
                          currentPassword: formik.values.currentPassword,
                          newPassword: formik.values.newPassword
                      }
                  }
              })
            //   console.log(result)
            
            if(!result.data.updateUser)   toast.error("Error al cambiar la contraseña")
            else {
                toast.success("Cambiada correctamente")
                onLogOut();
            }

        } catch (error) {
            console.log("err formPass", error)
            toast.error("Error al cambiar la contraseña")
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