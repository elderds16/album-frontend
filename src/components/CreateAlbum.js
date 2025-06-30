import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlbumForm from './AlbumForm';
import useCreateAlbum from '../hooks/useCreateAlbum';
import useAlbums from '../hooks/useAlbums';
import { Button } from '@material-ui/core';

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
            setDuplicateError('Dit album bestaat al.');
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
        <div>
            <Button
                component={Link}
                to="/"
                variant="outlined"
                style={{ marginBottom: '1rem' }}
            >
                Ga terug naar overzicht
            </Button>

            <h2>Create New Album</h2>

            {duplicateError && <p style={{ color: 'red' }}>{duplicateError}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {(isSubmitting || isLoading) ? (
                <p>Saving...</p>
            ) : (
                <AlbumForm onSubmit={handleSubmit} showSaveButton={true} />
            )}
        </div>
    );
};

export default CreateAlbum;
