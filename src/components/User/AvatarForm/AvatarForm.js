import React, {useCallback, useState} from 'react'
import { Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR, GET_USER, DELETE_AVATAR } from "../../../gql/user";
import "./AvatarForm.scss"

export default function AvatarForm(props) {

    const {setShowModal, auth } = props;
    const [loading, setLoading] = useState(false)
    // console.log("WTF", auth)
    const [updateAvatar] = useMutation( UPDATE_AVATAR, {
        
        update(cache, {data: { updateAvatar }}) {
            // console.log(updateAvatar)

            // leer la query
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: { username: auth.username }
            });

            // reescribir la cache
            cache.writeQuery({
                query: GET_USER,
                variables: { username: auth.username },
                data: {
                    getUser: { ...getUser, avatar: updateAvatar.urlAvatar }     // ... sirve como un : variable += variable
                }
            });
        }
    })

    const [deleteAvatar] = useMutation(DELETE_AVATAR, {
        update(cache) {
            // leer la query
            const { getUser } = cache.readQuery({
                query: GET_USER,
                variables: {username: auth.username}
            });

            // reescribir la cache
            cache.writeQuery({
                query: GET_USER,
                variables: {username: auth.username},
                data: {
                    getUser: {...getUser, avatar: ""}
                }
            })
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

    const onDeleteAvatar = async () => {
        // console.log("eliminar avatar")
        try {
            const result = await deleteAvatar();
            const {data } = result;

            if(!data.deleteAvatar){
                toast.warning("error al borrar el avatar")
            }else {
                setShowModal(false)
            }
        } catch (error) {
            console.log("err delAvat", error)
        }
    }

    return (
        <div className="avatar-form" >
            <Button {...getRootProps()} loading={loading} >Cargar foto</Button>
            <Button onClick={onDeleteAvatar} >Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)} >Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}
