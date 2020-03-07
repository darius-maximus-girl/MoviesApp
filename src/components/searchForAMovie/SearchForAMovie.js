import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieResults from './MovieResults';
import Popup from './Popup';
import { database } from '../firebase';
import MoviesCarousel from './MoviesCarousel';
import Message from './Message';

const apiKey = 'http://www.omdbapi.com/?apikey=c5a141fa&';
let recentlySearchedDB = database.ref('movies/');

function SearchForAMovie() {

    const [movies, setMovies] = useState([]);
    const [popup, setPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});
    const [recentlySearched, setRecentlySearched] = useState([]);
    const [movieAddedMsg, setMovieAddedMsg] = useState(false);

    useEffect(() => {
        recentlySearchedDB.on("value", function (snapshot) {
            let recentlySearchedMoviesDB = snapshot.val();
            setRecentlySearched(recentlySearchedMoviesDB);
        }, function (error) {
            console.log("Error: " + error.code);
        });
    }, []);

    useEffect(() => {
        console.log(recentlySearched)
    }, [recentlySearched]);

    const handleMovies = (data) => {
        setMovies(data);
    }

    const openPopup = (val, movieID) => {
        setPopup(val);
        fetch(apiKey + `i=${movieID}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (movie) {
                //Removes the first movie from slider on the basis of key
                let keyOfFirstMovie = Object.keys(recentlySearched)[0];
                recentlySearchedDB.child(keyOfFirstMovie).remove();

                //Adds a movie recently searched to DB and to the end of the slider
                console.log('HELLO', movie)

                recentlySearchedDB.push({
                    title: movie.Title,
                    poster: movie.Poster,
                });

                setSelectedMovie(movie);
            })
            .catch(function (err) {
                console.error(err)
            })
    }

    const closePopup = () => {
        setPopup(false);
        setSelectedMovie({});
    }

    const showMessage = (val) => {   
        setMovieAddedMsg(val);
        setTimeout(() => {
            setMovieAddedMsg(false)
        }, 1800);
    }

    return (
        <section className="header">
            <MoviesCarousel recentlySearched={recentlySearched} />
            <SearchBar apiKey={apiKey} handleMovies={handleMovies} />
            <MovieResults movies={movies} openPopup={openPopup} />
            {popup && <Popup closePopup={closePopup} selectedMovie={selectedMovie} showMessage={showMessage} />}
            {movieAddedMsg && <Message />}
        </section>
    );
}

export default SearchForAMovie;