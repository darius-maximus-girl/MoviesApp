import React from 'react';

function Popup({ closePopup, selectedMovie }) {

    //Adds a movie into the DB 
    const addMovieToWatch = () => {
        console.log('MOVIE ADDED')
    }

    return (
        <section onClick={() => closePopup()} className="popup-container">
            <img className="popup-container__img" src={selectedMovie.Poster} alt="movie-poster"></img>
            <div className="popup-container__desc">
                <h3>{selectedMovie.Title}</h3>
                <p>{selectedMovie.Year}</p>
                <p>{selectedMovie.Released}</p>
                <p>{selectedMovie.Runtime}</p>
                <p>{selectedMovie.Genre}</p>
                <p>{selectedMovie.Director}</p>
                <p>{selectedMovie.Writer}</p>
                <p>{selectedMovie.Actors}</p>
                <p>{selectedMovie.Plot}</p>
                <p>{selectedMovie.Language}</p>
                <p>{selectedMovie.Country}</p>
                <p>{selectedMovie.Awards}</p>
            </div>
            <button onClick={() => addMovieToWatch()}>Add to my list</button>
        </section>
    );
}

export default Popup;