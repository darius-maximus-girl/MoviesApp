import React, { useState, useEffect } from 'react';
import { database } from '../firebase';

const moviesToWatchDB = database.ref('moviesToWatch/');

function MoviesToWatch() {

    const [myMoviesToWatch, setMyMoviesToWatch] = useState([]);

    useEffect(() => {
        moviesToWatchDB.on("value", function (snapshot) {
            let movies = snapshot.val();
            setMyMoviesToWatch(movies);
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }, []);

    const removeMovie = (key) => {
        database.ref(`moviesToWatch/${key}`).remove()
    }

    const handleAlreadySeen = (key, value) => {
        database.ref(`moviesToWatch/${key}`).update({watched: !value})
    }

    return (
        <section className="towatch-container">
            {Object.values(myMoviesToWatch).map((movie, key) => {
                return (
                    <div className={movie.watched ? "towatch__item" : "towatch__item watched"} key={key}>
                        <p className="towatch__item-title">{movie.title}</p>
                        <img className="towatch__item-poster" src={movie.poster} alt="movie poster"></img>
                        <p className="towatch__item-year">{movie.year}</p>
                        <p className="towatch__item-time">{movie.time}</p>
                        <div className="towatch__item-btns">
                            <button className="rmvbtn" onClick={() => removeMovie(movie.id)}>Delete</button>
                            <label className="checkbox-container">
                                <input type="checkbox" onChange={() => handleAlreadySeen(movie.id, movie.watched)} checked={movie.watched} />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                )
            })}
        </section>
    );
}

export default MoviesToWatch;