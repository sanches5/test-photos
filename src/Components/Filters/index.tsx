import React, {FC} from 'react';
import {MenuItem, Select} from "@mui/material";
import './style.css';

type FilterProps = {
    albumId: string
    albumsIds: number[]
    handleSaveFilters: (albumId: string) => void
    handleResetFilters: () => void
}

const Filter: FC<FilterProps> = (
    {
        albumId,
        albumsIds,
        handleSaveFilters,
        handleResetFilters
    }) => {

    return (
            <div className={"Filter"}>
                <span className={"filterAlbumId"}>
                    Filter album id
                </span>
                <Select
                    className={"select"}
                    value={albumId}
                    defaultValue={""}
                    onChange={(event) => handleSaveFilters(event.target.value)}
                >
                    {albumsIds.length && albumsIds.map(albumId => {
                        return <MenuItem
                            key={albumId}
                            value={albumId}
                        >
                            {albumId}
                        </MenuItem>
                    })}
                </Select>
                <button disabled={!albumId} onClick={handleResetFilters}>reset filters</button>
            </div>
    );
}

export default Filter;
