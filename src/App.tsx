import React, {FC, useCallback, useEffect, useState} from 'react';
import {fetchConfig} from "./service/api";
import Table from "./Components/Table";
import './App.css';

type photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

const App: FC = () => {
    const [photos, setPhotos] = useState<photo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDeletePhoto = useCallback((id: number) => {
        setLoading(true)
        fetchConfig(`/photos/${id}`, "DELETE").then(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetchConfig("/photos", "GET").then(response => {
            setPhotos(response)
            setLoading(false)
        })
    }, [handleDeletePhoto])

    return (
        <div className="App">
            {!loading && photos.length ? <Table
                photos={photos}
                handleDeletePhoto={handleDeletePhoto}
            /> : <div>...LOADING</div>}
        </div>
    );
}

export default App;
