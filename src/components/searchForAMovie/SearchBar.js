import React, { useState } from 'react';

const SearchBar = ({ apiKey, handleMovies }) => {

    const [userTitle, setUserTitle] = useState('');

    const fetchMovies = (e) => {
        e.preventDefault();
        fetch(apiKey + `s=${userTitle}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (movies) {
                handleMovies(movies.Search)
                setUserTitle('');
            })
            .catch(function (err) {
                console.error(err)
            })
    }

    return (
        <section>
            <form className="searchbar">
                <input type="text" className="searchbar__input" onChange={e => setUserTitle(e.target.value)} placeholder="Find a movie... "/>
                <button className="searchbar__btn" onClick={fetchMovies}>Search</button>
            </form>
        </section>
    )
}

export default SearchBar;