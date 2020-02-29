// import React, { useState, useEffect } from 'react';
import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchForAMovie from './components/searchForAMovie/SearchForAMovie';
import MoviesToWatch from './components/moviesToWatch/MoviesToWatch';

function App() {

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <ul className="navbar__links">
            <li className="navbar__links-item">
              <Link to="/">Search movies</Link>
            </li>
            <li className="navbar__links-item">
              <Link to="/moviestowatch">Movies to watch</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact >
            <SearchForAMovie />
          </Route>
          <Route path="/moviestowatch">
            <MoviesToWatch />
          </Route>
        </Switch>
      <div className="static-background">

      </div>
      </div>
    </Router>
  );
}

export default App;
