import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AlbumCard from "./AlbumCard";
import useAlbums from "../hooks/useAlbums";

const AlbumOverview = () => {
    const { albums, isLoading, error } = useAlbums();

    if (isLoading) return <p>Loading albums...</p>;
    if (error) return <p style={{ color: "red" }}>Fout: {error}</p>;

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/new"
                style={{ marginBottom: '1rem' }}
            >
                Create New Album
            </Button>

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
        </div>
    );
};

export default AlbumOverview;
