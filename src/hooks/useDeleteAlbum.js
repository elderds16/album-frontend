import { useState } from 'react';

const useDeleteAlbum = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteAlbum = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/album/${id}`, {
                method: 'DELETE',
            });

            console.log('Response:', response);

            if (!response.ok) {
                const contentType = response.headers.get('Content-Type');
                let errorMessage = 'Failed to delete album';

                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.title || errorMessage;
                } else {
                    const errorText = await response.text();
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.title || errorMessage;
                    } catch (e) {
                        errorMessage = errorText || errorMessage;
                    }
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

    return { deleteAlbum, isLoading, error };
};

export default useDeleteAlbum;
