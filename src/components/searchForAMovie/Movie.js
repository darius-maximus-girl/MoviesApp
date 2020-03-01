import React from 'react';
import MovieIcon from '../../assets/images/movieicon1.png';

function Movie({ movie, openPopup }) {
    return (
        <li onClick={() => openPopup(true, movie.imdbID)} className="movie-results__list-item">
            <div className="title-container">
            <img className="movie-icon" src={MovieIcon} alt="movie icon"></img>
            <h2 className="title">{movie.Title}</h2>
            </div>
            <img className="poster" src={movie.Poster} alt="movie poster"></img>

        </li>
    )
}

export default Movie;

