import React, {FC, useEffect, useMemo, useState} from 'react';
import {Pagination} from "@mui/material";
import Row from "../Row";
import './style.css';
import Filter from "../Filters";
import {useLocalStorage} from "../../utils/useLocalStorage";

type photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

type TableProps = {
    photos: photo[],
    handleDeletePhoto: (id: number) => void
}

const Table: FC<TableProps> = ({photos, handleDeletePhoto}) => {
    const [initPhotos, setIntPhotos] = useState<photo[]>([...photos]);
    const [photosPage, setPhotosPage] = useState<photo[]>(initPhotos.slice(0, 15));
    const [albumId, setAlbumId] = useLocalStorage<string>('albumId', '');
    const [page, setPage] = useLocalStorage<number>('page', 1);

    useEffect(() => {
        if(page > 1) {
            handleChangePage(page)
        }
        if(albumId) {
            handleSaveFilters(albumId)
        }
    }, [])

    const handleChangePage = (currentPage: number) => {
        const index = currentPage === 1 ? 0 : currentPage - 1;
        setPhotosPage([...initPhotos.slice(index * 15, index * 15 + 15)]);
        setPage(currentPage);
    };

    const handleSaveFilters = (albumId: string) => {
        const filterPhotos: photo[] = photos.filter(photo => photo.albumId === (+albumId));
        setPhotosPage([...filterPhotos.slice(0, 15)]);
        setIntPhotos(filterPhotos)
        setAlbumId(albumId);
        setPage(1)
    };

    const handleResetFilters = () => {
        setIntPhotos([...photos])
        setPhotosPage([...photos.slice(0, 15)]);
        setAlbumId('');
        setPage(1)
    };

    const albumsIds: number[] = useMemo(() => {
        const listAlbumsIds: number[] = [];

        photos.forEach(e => {
            if (!listAlbumsIds.includes(e.albumId)) {
                listAlbumsIds.push(e.albumId);
            }
        })

        return listAlbumsIds
    }, [photos]);

    return (
        <div className="Table">
            <Filter
                albumId={albumId}
                albumsIds={albumsIds}
                handleResetFilters={handleResetFilters}
                handleSaveFilters={handleSaveFilters}
            />

            {photosPage.length ? photosPage.map(photo => {
                return <Row
                    key={photo.id}
                    id={photo.id}
                    title={photo.title}
                    src={photo.thumbnailUrl}
                    albumId={photo.albumId}
                    srcModal={photo.url}
                    handleDeletePhoto={handleDeletePhoto}
                />
            }) : <div>not photos</div>}

            <Pagination
                className={"pagination"}
                page={page}
                count={Math.ceil(initPhotos.length / 15)}
                onChange={(event, page) => handleChangePage(page)}
                variant="outlined"
            />
        </div>
    );
}

export default Table;
