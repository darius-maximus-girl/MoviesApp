import React, { useState, useEffect } from 'react';
import { database } from '../firebase';

const moviesToWatchDB = database.ref('moviesToWatch/');

function MoviesToWatch() {

    //FUTURE: Add 'mark as watched' functionality (checkbox which adds class with greyscale if watched === true // it would update the moviesToWatchDB)

    const [myMoviesToWatch, setMyMoviesToWatch] = useState([]);

    useEffect(() => {
        moviesToWatchDB.on("value", function (snapshot) {
            let movies = snapshot.val();
            setMyMoviesToWatch(movies);
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }, []);

    //Function that gets the key of the current movie and removes it from DB
    const removeMovie = (key) => {
        return key
    }

    //Gets a list of moviesToWatch from the db after the app is fired
    return (
        <section className="towatch-container">
                {Object.values(myMoviesToWatch).map((movie, key) => {
                    return (
                        <div className="towatch__item" key={key}>
                            <p className="towatch__item-title">{movie.title}</p>
                            <img className="towatch__item-poster" src={movie.poster} alt="movie poster"></img>
                            <p className="towatch__item-year">{movie.year}</p>
                            <p className="towatch__item-time">{movie.time}</p>
                            <button className="towatch__item-rmvbtn" onClick={() => removeMovie()}>Delete</button>
                        </div>
                    )
                })}
        </section>
    );
}

export default MoviesToWatch;