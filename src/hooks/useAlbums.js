import { useEffect, useState } from "react";

const endpoint = `${process.env.REACT_APP_API_URL}/album`;

const useAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch(endpoint);

                const text = await response.text(); 
                console.log("Raw API response:", text); 

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }

                const data = JSON.parse(text); 
                data.sort((a, b) => {
                    if (a.artist.toLowerCase() < b.artist.toLowerCase()) return -1;
                    if (a.artist.toLowerCase() > b.artist.toLowerCase()) return 1;
                    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                    return 0;
                });

                setAlbums(data);
            } catch (error) {
                console.error("Fout bij ophalen albums:", error); 
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAlbums();
    }, []);

    return { albums, isLoading, error };
};

export default useAlbums;
