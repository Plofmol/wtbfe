import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('http://www.omdbapi.com/?apikey=97e7387&s=movie&type=movie&plot=short&page=1&limit=10');
                setMovies(response.data.Search);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Top 10 Movies</h1>
            {movies.length === 0 ? (
                <p>Loading...</p>
            ) : (
                movies.map((movie) => (
                    <p key={movie.imdbID}>{movie.Title}</p>
                ))
            )}
        </div>
    );
};

export default MovieList;