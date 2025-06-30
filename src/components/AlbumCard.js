import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";  

const AlbumCard = ({ id, name, artist, imageUrl }) => {
    return (
        <Card
            elevation={3}
            style={{
                width: "100%",
                maxWidth: 200,
                margin: "auto",
                borderRadius: 8,
            }}
        >
            <Link to={`/album/${id}`} style={{ textDecoration: "none" }}>
                <CardMedia
                    component="img"
                    image={imageUrl}
                    alt={`${name} album cover`}
                    style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                />
            </Link>
            <CardContent style={{ padding: "8px", textAlign: "left" }}>
                <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {artist}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AlbumCard;
