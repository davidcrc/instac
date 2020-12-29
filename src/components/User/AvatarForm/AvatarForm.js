import React, {useCallback, useState} from 'react'
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER } from "../../../gql/user";
import "./AvatarForm.scss"

export default function AvatarForm(props) {

    const {setShowModal, auth } = props;
    const [loading, setLoading] = useState(false)
    // console.log("WTF", auth)
    const [updateAvatar] = useMutation( UPDATE_AVATAR, {
        
        update(cache, {data: { updateAvatar }}) {
            // console.log(updateAvatar)
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            });

            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar }
                }
            });
        }
    })

    const onDrop = useCallback(
        async (acceptedFile) => {
            // console.log(acceptedFile)
            const file = acceptedFile[0];

            try {
                setLoading(true)
                const result = await updateAvatar( {
                        variables: { file }
                    }
                )
                const {data} = result;
                if(!data.updateAvatar.status){
                    toast.warning("error al actualizar el avatar")
                    setLoading(false)
                }
                else {
                    setLoading(false)
                    setShowModal(false)
                }
                console.log(result);
            } catch (error) {
                console.log("upload ",error)
            }
        },
        [],
    )

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png, image/jpg",
        noKeyboard: true,
        multiple: false,
        onDrop
    })

    return (
        <div className="avatar-form" >
            <Button {...getRootProps()} loading={loading} >Cargar foto</Button>
            <Button>Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}
