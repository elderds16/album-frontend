import { useEffect, useState } from "react";

const endpointBase = `${process.env.REACT_APP_API_URL}/album`;

const useAlbum = (albumId) => {
    const [album, setAlbum] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!albumId) return;

        const fetchAlbum = async () => {
            try {
                const response = await fetch(`${endpointBase}/${albumId}`);

                const text = await response.text();
                console.log("Raw API response:", text);

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }

                const data = JSON.parse(text);

                setAlbum(data);
            } catch (error) {
                console.error("Fout bij ophalen album:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbum();
    }, [albumId]);

    return { album, isLoading, error };
};

export default useAlbum;
