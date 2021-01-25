import React, { useCallback, useState } from 'react'
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import { toast } from 'react-toastify';
import { useDropzone } from "react-dropzone";
import { useMutation } from '@apollo/client';
import { PUBLISH } from "../../../gql/publication";

import "./ModalUpload.scss"

export default function ModalUpload(props) {
    
    const { show, setShow} = props;
    const [fileUpload, setFileUpload] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [ Publish ] = useMutation(PUBLISH)

    // console.log(fileUpload)

    const onDrop = useCallback(( acceptedFile ) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: "image",
            file,
            preview: URL.createObjectURL(file)
        })
    })

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/jpeg, image/png, image/jpg",
        noKeyboard: true,
        multiple: false,
        onDrop
    })
    

    const onClose = () => {
        setShow(false);
        setIsLoading(false)
        setFileUpload(null);
        setShow(false);
    }

    const onPublish = async () => {
        // console.log("publicando...")

        try {
            setIsLoading(true);
            const result = await Publish({
                variables: {
                    file: fileUpload.file
                }
            });
            // console.log("result publish", result);

            const { data } = result;
            if(!data.publish.status){
                toast.warning("Error en la publicación")
                isLoading(false);
            }
            else{
                onClose();
            }
        } catch (error) {
            console.log("err publish", error );
            toast.warning("Error en la publicación")
        }
    }
    
    
    return (
        <Modal size="small" open={show} onClose={onClose}  className="modal-upload" >
            <div 
                {...getRootProps()} 
                className="drop-zone"  
                style={ fileUpload &&  { border: 0}  } 
            >
                { !fileUpload  && (
                    <>
                        <Icon name="cloud upload" />
                        <p>Arrastra o clickea aquí para publicar tu foto o video. </p>
                    </>
                )}
                <input {...getInputProps()} />
            </div>

            { fileUpload?.type === "image" && (
                    <div className="image" style={{ backgroundImage: `url("${fileUpload.preview}")` }} >

                    </div>
            )}

            { fileUpload && (
                <Button className="btn-upload btn-action" onClick={onPublish} >
                    Publicar
                </Button>
            )}

            { isLoading && (
                <Dimmer active className="publishing" >
                    <Loader />
                    <p>Publicando ...</p>
                </Dimmer>
            )
            }

        </Modal>
    )
}