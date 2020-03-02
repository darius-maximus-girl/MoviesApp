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

    return (
        <section className="towatch-container">
                {Object.values(myMoviesToWatch).map((movie, key) => {
                    return (
                        <div className="towatch__item" key={key}>
                            <p className="towatch__item-title">{movie.title}</p>
                            <img className="towatch__item-poster" src={movie.poster} alt="movie poster"></img>
                            <p className="towatch__item-year">{movie.year}</p>
                            <p className="towatch__item-time">{movie.time}</p>
                            <button className="towatch__item-rmvbtn" onClick={() => removeMovie(movie.id)}>Delete</button>
                        </div>
                    )
                })}
        </section>
    );
}

export default MoviesToWatch;