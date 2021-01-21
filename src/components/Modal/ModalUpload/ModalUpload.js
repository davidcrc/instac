import React from 'react'
import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
import "./ModalUpload.scss"

export default function ModalUpload(props) {
    
    const { show, setShow} = props;

    const onClose = () => {
        setShow(false);
    }
    
    return (
        <Modal size="small" open={show} onClose={onClose}  className="modal-upload" >
            <h1>El modal de subir</h1>
        </Modal>
    )
}