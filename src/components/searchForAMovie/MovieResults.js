import React from 'react';
import Movie from './Movie';

function MovieResults({ movies, openPopup }) {
    return (
        <section className="movie-results">
            <ul className="movie-results__list">
                {
                    movies.map((movie, key) => (
                        movie.Poster !== 'N/A' ? <Movie openPopup={openPopup} movie={movie} key={key} className="movie-results__list-item" /> : ''
                    ))
                }
            </ul>
        </section>
    );
}

export default MovieResults;