import React, { useState } from 'react';

const noResultsMsg = 'Sorry, no results found. Try again!';

const SearchBar = ({ apiKey, handleMovies }) => {

    const [userTitle, setUserTitle] = useState('');
    const [message, setMessage] = useState('')

    const fetchMovies = (e) => {
        e.preventDefault();
        fetch(apiKey + `s=${userTitle}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (movies) {
                if (movies.Response === 'False') {
                    setMessage(noResultsMsg);
                } else {
                    setUserTitle('');
                    handleMovies(movies.Search);
                    setMessage('')
                }
            })
            .catch(function (err) {
                console.error(err);
            })
    }

    return (
        <section className="searchbar-container">
            <form className="searchbar">
                <input type="text" className="searchbar__input" onChange={e => setUserTitle(e.target.value)} placeholder="Find a movie... " />
                <button className="searchbar__btn" onClick={fetchMovies}>Search</button>
            </form>
            <p className="no-results-msg">{message}</p>
        </section>
    )
}

export default SearchBar;