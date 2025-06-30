// src/components/AlbumDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, CircularProgress, Box } from "@material-ui/core";
import useAlbum from "../hooks/useAlbum";
import AlbumCard from "./AlbumCard";

const AlbumDetail = () => {
    const { albumId } = useParams();
    const { album, isLoading, error } = useAlbum(albumId);

    if (isLoading) return <CircularProgress />;
    if (error) return <p style={{ color: "red" }}>Fout: {error}</p>;
    if (!album) return <p>Album niet gevonden</p>;

    return (
        <Box p={3}>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary" style={{ marginBottom: 16 }}>
                    Terug naar overzicht
                </Button>
            </Link>

            <AlbumCard
                id={album.id}
                name={album.name}
                artist={album.artist}
                imageUrl={album.imageUrl}
            />
        </Box>
    );
};

export default AlbumDetail;
