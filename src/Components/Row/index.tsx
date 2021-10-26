import React, {FC, useState} from 'react';
import ModalPhoto from "../ModalPhoto";
import './style.css';

type propsRow = {
    title: string
    src: string
    srcModal: string
    handleDeletePhoto: (id: number) => void
    id: number
    albumId: number
}

const Row: FC<propsRow> = (
    {
        title,
        src,
        srcModal,
        handleDeletePhoto,
        id,
        albumId
    }) => {
    const [statusModal, setStatusModal] = useState<boolean>(false)

    const handleOpen = () => {
        setStatusModal(true)
    }

    const handleClose = () => {
        setStatusModal(false)
    }

    return (
        <div className="Row">
            <ModalPhoto
                statusModal={statusModal}
                handleClose={handleClose}
                srcModal={srcModal}
                albumId={albumId}
                title={title}
                id={id}
                handleDeletePhoto={handleDeletePhoto}
            />
            <img className={"photo"} src={src} onClick={handleOpen} alt=""/>
            <div className={"title"}>{title}</div>
            <button className={"delete"} onClick={() => handleDeletePhoto(id)}>delete</button>
        </div>
    );
}

export default React.memo(Row);
