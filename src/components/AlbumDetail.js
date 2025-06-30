import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const AlbumDetail = () => {
    return (
        <div>
            <h2>Album Details (placeholder)</h2>
            <Link to="/">
                <Button variant="contained" color="primary">
                    Terug naar overzicht
                </Button>
            </Link>
        </div>
    );
};

export default AlbumDetail;
