import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import AlbumOverview from "./components/AlbumOverview";
import AlbumDetail from "./components/AlbumDetail";  // importeer AlbumDetail
import CreateAlbum from "./components/CreateAlbum";

function App() {
    return (
        <BrowserRouter>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                            Album Collection
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: "2rem" }}>
                <Routes>
                    <Route path="/" element={<AlbumOverview />} />
                    <Route path="/album/:albumId" element={<AlbumDetail />} />  {/* nieuwe route */}
                    <Route path="/new" element={<CreateAlbum />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
