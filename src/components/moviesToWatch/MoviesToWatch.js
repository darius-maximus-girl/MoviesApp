import React, { useState, useEffect } from 'react';
import { database } from '../firebase';

const moviesToWatchDB = database.ref('moviesToWatch/');

function MoviesToWatch() {

    const [myMoviesToWatch, setMyMoviesToWatch] = useState([]);

    useEffect(() => {
        moviesToWatchDB.on("value", function (snapshot) {
            let movies = snapshot.val();
            setMyMoviesToWatch(movies);
            console.log('MOVIES FROM DB', movies);
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
        <section>
            MY MOVIES
            <div>
                {Object.values(myMoviesToWatch).map((el, key) => {
                    console.log(el)
                    return (
                        <div key={key}>
                            <p>{el.title}</p>
                            <p>{el.year}</p>
                            {/* <button onClick={() => removeMovie()}></button> */}
                        </div>
                    )
                })}
            </div>
        </section>
    );
}

export default MoviesToWatch;