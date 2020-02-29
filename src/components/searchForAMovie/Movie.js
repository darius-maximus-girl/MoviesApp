import React from 'react';
// import MoviePlaceholder from '../assets/images/movie_placeholder.png';

function Movie({ movie, openPopup }) {
    return (
        <li onClick={() => openPopup(true, movie.imdbID)} className="movie-results__list-item">
            <h2>{movie.Title}</h2>
            {/* <img src={movie.Poster !== 'N/A' ? movie.Poster : MoviePlaceholder} alt="movie-poster"></img> */}
            <img src={movie.Poster} alt="movie-poster"></img>

        </li>
    )
}

export default Movie;

