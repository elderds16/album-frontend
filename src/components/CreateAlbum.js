import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlbumForm from './AlbumForm';
import useCreateAlbum from '../hooks/useCreateAlbum';

const CreateAlbum = () => {
    const navigate = useNavigate();
    const { createAlbum, isLoading, error } = useCreateAlbum();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (newAlbum) => {
        setIsSubmitting(true);
        const success = await createAlbum(newAlbum);
        setIsSubmitting(false);

        if (success) {
            navigate('/');
        }
    };

    return (
        <div>
            <h2>Create New Album</h2>
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
