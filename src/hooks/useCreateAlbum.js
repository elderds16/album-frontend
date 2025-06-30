import { useState } from 'react';

const useCreateAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createAlbum = async (newAlbum) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/album`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlbum),
      });

      if (!response.ok) {
        const contentType = response.headers.get('Content-Type');
        let errorMessage = 'Failed to create album';

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

  return { createAlbum, isLoading, error };
};

export default useCreateAlbum;
