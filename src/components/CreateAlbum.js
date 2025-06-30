import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlbumForm from './AlbumForm';
import useCreateAlbum from '../hooks/useCreateAlbum';
import useAlbums from '../hooks/useAlbums';
import { Button, Typography, Box, Paper } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const CreateAlbum = () => {
    const navigate = useNavigate();
    const { createAlbum, isLoading, error } = useCreateAlbum();
    const { albums } = useAlbums();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [duplicateError, setDuplicateError] = useState(null);

    const handleSubmit = async (newAlbum) => {
        const duplicate = albums.some(
            (a) =>
                a.name.toLowerCase().trim() === newAlbum.name.toLowerCase().trim() &&
                a.artist.toLowerCase().trim() === newAlbum.artist.toLowerCase().trim()
        );

        if (duplicate) {
            setDuplicateError('This album already exists.');
            return;
        }

        setDuplicateError(null);
        setIsSubmitting(true);
        const success = await createAlbum(newAlbum);
        setIsSubmitting(false);

        if (success) {
            navigate('/');
        }
    };

    return (
        <Box maxWidth={600} mx="auto" mt={4} p={2}>
            <Button
                component={Link}
                to="/"
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                style={{ marginBottom: 24 }}
            >
                Back to overview
            </Button>

            <Paper elevation={3} style={{ padding: '24px' }}>
                <Typography variant="h5" gutterBottom>
                    Create New Album
                </Typography>

                {duplicateError && (
                    <Typography color="error" gutterBottom>
                        {duplicateError}
                    </Typography>
                )}

                {error && (
                    <Typography color="error" gutterBottom>
                        {error}
                    </Typography>
                )}

                {(isSubmitting || isLoading) ? (
                    <Typography>Saving...</Typography>
                ) : (
                    <AlbumForm onSubmit={handleSubmit} showSaveButton={true} />
                )}
            </Paper>
        </Box>
    );
};

export default CreateAlbum;
