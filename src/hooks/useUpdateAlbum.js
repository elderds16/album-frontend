import { useState } from 'react';

const useUpdateAlbum = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateAlbum = async (id, updatedAlbum) => {
        setIsLoading(true);
        setError(null);
        try {
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

                throw new Error(errorMessage);
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
