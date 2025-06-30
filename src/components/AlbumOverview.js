import React from "react";
import { Grid } from "@material-ui/core";
import AlbumCard from "./AlbumCard";
import useAlbums from "../hooks/useAlbums"; // pas het pad aan als nodig

const AlbumOverview = () => {
    const { albums, isLoading, error } = useAlbums();

    if (isLoading) return <p>Loading albums...</p>;
    if (error) return <p style={{ color: "red" }}>Fout: {error}</p>;

    return (
        <Grid container spacing={2} justifyContent="center">
            {albums.map((album) => (
                <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2.4} key={album.id}>
                    <AlbumCard
                        id={album.id}
                        name={album.name}
                        artist={album.artist}
                        imageUrl={album.imageUrl}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default AlbumOverview;
