import React, { useState, useEffect } from 'react';
import { database } from '../firebase';

const moviesToWatchDB = database.ref('moviesToWatch/');

function MoviesToWatch() {

    const [myMoviesToWatch, setMyMoviesToWatch] = useState([]);
    // const [watchedNum, setWatchedNum] = useState(0);
    // const [toWatchNum, setToWatchNum] = useState(0);

    // const [myMoviesToWatch, setMyMoviesToWatch] = useState([]);

    // useEffect(() => {
    //     const dispose = moviesToWatchDB.on("value", function (snapshot) {
    //         let movies = snapshot.val();
    //         setMyMoviesToWatch(movies);
    //     }, function (error) {
    //         console.log("Error: " + error.code);
    //     });
    //     return () => dispose()
    // }, []);

    useEffect(() => {
        moviesToWatchDB.on("value", function (snapshot) {
            let movies = snapshot.val();
            setMyMoviesToWatch(movies);
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }, []);

    const moviesList = Object.values(myMoviesToWatch)
    const watchedNum = moviesList.filter(movie => movie.watched)
    const toWatchNum = moviesList.filter(movie => !movie.watched)

    // useEffect(() => {
    //     let watched = Object.values(myMoviesToWatch).filter(movie => {
    //         return movie.watched === true
    //     });
    //     setWatchedNum(watched.length);

    //     let toWatch = Object.values(myMoviesToWatch).filter(movie => {
    //         return movie.watched === false
    //     });

    //     setToWatchNum(toWatch.length);

    // }, [myMoviesToWatch]);

    const removeMovie = (key) => {
        database.ref(`moviesToWatch/${key}`).remove()
    }

    const handleWatched = (key, value) => {
        database.ref(`moviesToWatch/${key}`).update({ watched: !value })
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
                        <img className="towatch__item-poster" src={movie.poster} alt="movie poster"></img>
                        <p className="towatch__item-year">{movie.year}</p>
                        <p className="towatch__item-time">{movie.time}</p>
                        <div className="towatch__item-btns">
                            <button className="rmvbtn" onClick={() => removeMovie(movie.id)}>Delete</button>
                            <label className="checkbox-container">
                                <input type="checkbox" onChange={() => handleWatched(movie.id, movie.watched)} checked={movie.watched} />
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