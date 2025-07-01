import { useState } from 'react';

const useUpdateAlbum = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAlbum = async (id, updatedAlbum) => {
        setIsLoading(true);
        setError(null);
        try {
            const albumsResponse = await fetch(`${process.env.REACT_APP_API_URL}/album`);
            if (!albumsResponse.ok) {
                throw new Error('Failed to fetch albums for duplicate check');
            }
            const albums = await albumsResponse.json();

            const duplicate = albums.some(
                (a) =>
                    a.name.toLowerCase().trim() === updatedAlbum.name.toLowerCase().trim() &&
                    a.artist.toLowerCase().trim() === updatedAlbum.artist.toLowerCase().trim()
            );

            if (duplicate) {
                setError('An album with this name and artist already exists.');
                return false;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/album/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAlbum),
            });

            if (!response.ok) {
                const contentType = response.headers.get('Content-Type');
                let errorMessage = 'Failed to update album';

                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } else {
                    const errorText = await response.text();
                    errorMessage = errorText || errorMessage;
                }

                setError(errorMessage);
                return false;
            }

            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { updateAlbum, isLoading, error };
};

export default useUpdateAlbum;
