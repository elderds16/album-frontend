import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useAlbum from '../hooks/useAlbum';
import useDeleteAlbum from '../hooks/useDeleteAlbum';
import useUpdateAlbum from '../hooks/useUpdateAlbum';
import AlbumForm from './AlbumForm';

const AlbumDetail = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();

    const { album, isLoading: loading, error } = useAlbum(albumId);
    const { deleteAlbum, isLoading: isDeleting, error: deleteError } = useDeleteAlbum();
    const { updateAlbum, isLoading: isUpdating, error: updateError } = useUpdateAlbum();

    const handleUpdate = async (updatedAlbum) => {
        const success = await updateAlbum(albumId, updatedAlbum);
        if (success) {
            navigate('/');
        }
    };

    const removeAlbum = async () => {
        const success = await deleteAlbum(albumId);
        if (success) {
            navigate('/');
        }
    };

    if (loading) return <div>Loading album...</div>;
    if (error) return <div style={{ color: 'red' }}>Error loading album: {error}</div>;
    if (isDeleting) return <div>Deleting album...</div>;
    if (isUpdating) return <div>Updating album...</div>;

    return (
        <div>
            <Button
                component={Link}
                to="/"
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                style={{ marginBottom: '1.5rem', textTransform: 'none' }}
            >
                Back to overview
            </Button>

            {/* Titel */}
            <Typography variant="h4" component="h1" gutterBottom>
                Album Overview
            </Typography>

            {album && (
                <img
                    src={album.imageUrl}
                    alt={`${album.name} cover`}
                    style={{
                        maxWidth: '250px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                />
            )}

            {deleteError && <p style={{ color: 'red' }}>Can't remove: {deleteError}</p>}
            {updateError && <p style={{ color: 'red' }}>Can't update: {updateError}</p>}

            {album && (
                <AlbumForm
                    album={album}
                    onSubmit={handleUpdate}
                    showSaveButton={false}
                    showUpdateButton={true}
                    onRemove={removeAlbum}
                />
            )}
        </div>
    );
};

export default AlbumDetail;
