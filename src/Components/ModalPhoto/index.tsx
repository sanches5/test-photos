import React, {FC} from 'react';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './style.css';

type propsModalPhoto = {
    title: string
    srcModal: string
    handleDeletePhoto: (id: number) => void
    id: number
    statusModal: boolean
    handleClose: () => void
    albumId: number
}

const ModalPhoto: FC<propsModalPhoto> = (
    {
        title,
        srcModal,
        handleDeletePhoto,
        id,
        handleClose,
        statusModal,
        albumId
    }) => {
    return (
        <Modal
            open={statusModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div className={"Modal"}>
                <div className={"ModalHeader"}>
                    <CloseIcon onClick={handleClose}/>
                </div>
                <img src={srcModal} alt="color"/>
                <div>{title}</div>
                <div>albumId: {albumId}</div>
                <button className={"delete"} onClick={() => handleDeletePhoto(id)}>delete</button>
            </div>
        </Modal>
    );
}

export default ModalPhoto;
