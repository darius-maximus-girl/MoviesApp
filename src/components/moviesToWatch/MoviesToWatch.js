import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import MovieDetails from './MovieDetails';
import Rating from '@mui/material/Rating';

const moviesToWatchDB = database.ref('moviesToWatch/');

function MoviesToWatch() {

    const [myMoviesToWatch, setMyMoviesToWatch] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [value, setValue] = useState(null);

    useEffect(() => {
        let dispose = moviesToWatchDB.on("value", function (snapshot) {
            let movies = snapshot.val();
            setMyMoviesToWatch(movies);
        }, function (error) {
            console.log("Error: " + error.code);
        });

        return () => moviesToWatchDB.off("value", dispose);
    }, []);

    const moviesList = Object.values(myMoviesToWatch);
    const watchedNum = moviesList.filter(movie => movie.watched);
    const toWatchNum = moviesList.filter(movie => !movie.watched);

    const removeMovie = (key) => {
        database.ref(`moviesToWatch/${key}`).remove()
    }

    const showMovieDetails = (movie) => {
        setMovieDetails(movie)
    }

    const closeMovieDetails = () => {
        setMovieDetails(null);
        console.log(movieDetails);
    }

    const handleWatched = (key, value) => {
        database.ref(`moviesToWatch/${key}`).update({ watched: !value, date: new Date().toDateString()})
    }

    const handleRating = (key, value) => {
        database.ref(`moviesToWatch/${key}`).update({ rating: value })
    }

    return (
        <section className="towatch-container">
            <div className="towatch-counter">
                <p>To watch <span>{toWatchNum.length}</span></p>
                <p>Just seen <span>{watchedNum.length}</span></p>
            </div>
            {Object.values(myMoviesToWatch).map((movie, key) => {
                return (
                    <div className={movie.watched ? "towatch__item" : "towatch__item watched"} key={key}>
                        <p className="towatch__item-title">{movie.title}</p>
                        <img className="towatch__item-poster" src={movie.poster} alt="movie poster" onClick={() => showMovieDetails(movie)}></img>
                        <p className="towatch__item-year">{movie.year}</p>
                        <p className="towatch__item-time">{movie.time}</p>
                        { movie.watched &&
                            <Rating
                                className="towatch__item-rating"
                                name="simple-controlled"
                                value={movie.rating}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    handleRating(movie.id, newValue)
                                }}
                            />
                        }
                        <div className="towatch__item-btns">
                            <button className="rmvbtn" onClick={() => removeMovie(movie.id)}>Delete</button>
                            <label className="checkbox-container">
                                <input type="checkbox" onChange={() => handleWatched(movie.id, movie.watched)} checked={movie.watched} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        {movie.watched && movieDetails && movieDetails.id === movie.id && (
                            <MovieDetails movie={movie} closeMovieDetails={closeMovieDetails} />
                        )}
                    </div>
                )
            })}
        </section>
    );
}

export default MoviesToWatch;