import React from 'react';

function Popup({ closePopup, selectedMovie }) {

    //Adds a movie into the DB 
    const addMovieToWatch = () => {
        console.log('MOVIE ADDED', selectedMovie)
    }

    return (
        <section onClick={() => closePopup()} className="popup-container">
            <img className="popup-container__img" src={selectedMovie.Poster} alt="movie-poster"></img>
            <div className="popup-container__desc">
                <h3 className="popup-container__desc-title">{selectedMovie.Title}</h3>
                <p className="popup-container__desc-year">{selectedMovie.Year}</p>
                <p className="popup-container__desc-runtime">{selectedMovie.Runtime}</p>
                <p className="popup-container__desc-genre">{selectedMovie.Genre}</p>
                <p className="popup-container__desc-director"><span>Director:</span> {selectedMovie.Director}</p>
                <p className="popup-container__desc-actors"><span>Actors:</span> {selectedMovie.Actors}</p>
                <div className="line"></div>
                <p className="popup-container__desc-plot"><span>Plot: </span>{selectedMovie.Plot}</p>
                <div className="line"></div>
                <p className="popup-container__desc-lang"><span>Languages:</span> {selectedMovie.Language}</p>
                <p className="popup-container__desc-country"><span>Country:</span> {selectedMovie.Country}</p>
                <p className="popup-container__desc-awards"><span>Awards:</span> {selectedMovie.Awards}</p>
            </div>
            <button className="popup-container__btn" onClick={() => addMovieToWatch()}>Add to my list</button>
        </section>
    );
}

export default Popup;