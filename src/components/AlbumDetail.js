import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';
import useAlbum from '../hooks/useAlbum';
import useDeleteAlbum from '../hooks/useDeleteAlbum';
import useUpdateAlbum from '../hooks/useUpdateAlbum';
import AlbumForm from './AlbumForm';

const AlbumDetail = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();

    const { album, isLoading: loading, error } = useAlbum(id);
    const { deleteAlbum, isLoading: isDeleting, error: deleteError } = useDeleteAlbum();
    const { updateAlbum, isLoading: isUpdating, error: updateError } = useUpdateAlbum();

    const handleUpdate = async (updatedAlbum) => {
        const success = await updateAlbum(id, updatedAlbum);
        if (success) {
            navigate('/');
        }
    };

    const removeAlbum = async () => {
        const success = await deleteAlbum(id);
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
            <Card style={{ marginBottom: '20px' }}>
                <CardActionArea component={Link} to="/">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Back to Album Overview
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

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
