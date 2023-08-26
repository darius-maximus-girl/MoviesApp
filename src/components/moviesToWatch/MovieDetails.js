import React from 'react';
import { database } from '../firebase';
import Close from '../../assets/images/close.png';
import TextField from '@mui/material/TextField';

const MovieDetails = ({ movie, closeMovieDetails }) => {


    const handleMovieNote = (key, value) => {
        database.ref(`moviesToWatch/${key}`).update({ note: value })
    }

    return (
        <section className="movie-details popup-container">
            <div className="popup" >
                <img className="popup__close-img" onClick={() => closeMovieDetails()} src={Close} alt="close icon"></img>
                <div className='movie-details__poster'>
                    <img src={movie.poster} alt="movie poster"></img>
                </div>
                <div className='movie-details__date'><span>Date of watching:</span> {movie.date ? movie.date : 'unavailable'}</div>
                <div className='movie-details__rating'><span>Our Rating:</span> {movie.rating ? movie.rating + '/5' : 'This movie has not been rated.'}</div>
                <TextField className='movie-details__textfield'
                    id="filled-textarea"
                    label="Our thoughts"
                    multiline
                    variant="filled"
                    value={movie.note}
                    onChange={(event) => handleMovieNote(movie.id, event.target.value)}
                />
            </div>
        </section>
    );
};

export default MovieDetails;