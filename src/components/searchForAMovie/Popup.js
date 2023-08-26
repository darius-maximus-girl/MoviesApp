import React from 'react';
import { database } from '../firebase';
import Close from '../../assets/images/close.png';

let moviesToWatchDB = database.ref('moviesToWatch/');

function Popup({ closePopup, selectedMovie, showMessage }) {

    //Adds a movie into the DB 
    const addMovieToWatch = (movie) => {
        moviesToWatchDB.push({
            title: movie.Title,
            poster: movie.Poster,
            year: movie.Year,
            time: movie.Runtime,
            description: movie.Plot, 
            watched: false
        }).then((snapshot) => {
            moviesToWatchDB.child(snapshot.key).update({ "id": snapshot.key })
        });

        closePopup();
        showMessage(true);
    }

    return (
        <section className="popup-container">
            <div className="popup" >
                <img className="popup__close-img" onClick={() => closePopup()} src={Close} alt="close icon"></img>
                <img className="popup__img" src={selectedMovie.Poster} alt="movie-poster"></img>
                <div className="popup__desc">
                    <h3 className="popup__desc-title">{selectedMovie.Title}</h3>
                    <p className="popup__desc-year">{selectedMovie.Year}</p>
                    <p className="popup__desc-runtime">{selectedMovie.Runtime}</p>
                    <p className="popup__desc-genre">{selectedMovie.Genre}</p>
                    <p className="popup__desc-director"><span>Director:</span> {selectedMovie.Director}</p>
                    <p className="popup__desc-actors"><span>Actors:</span> {selectedMovie.Actors}</p>
                    <div className="line"></div>
                    <p className="popup__desc-plot"><span>Plot: </span>{selectedMovie.Plot}</p>
                    <div className="line"></div>
                    <p className="popup__desc-lang"><span>Languages:</span> {selectedMovie.Language}</p>
                    <p className="popup__desc-country"><span>Country:</span> {selectedMovie.Country}</p>
                    <p className="popup__desc-awards"><span>Awards:</span> {selectedMovie.Awards}</p>
                </div>
                <button className="popup__btn" onClick={() => addMovieToWatch(selectedMovie)}>Add to my list</button>
            </div>
        </section>
    );
}

export default Popup;