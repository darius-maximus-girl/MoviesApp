import React, { useState, useEffect } from 'react';
// import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchForAMovie from './components/searchForAMovie/SearchForAMovie';
import MoviesToWatch from './components/moviesToWatch/MoviesToWatch';

function App() {

  const [isTop, setIsTop] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const top = window.scrollY > 30;
      if (top !== isTop) {
        setIsTop({ top })
      } else {
        setIsTop(false)
      }
    });
  }, [])

  return (
    <Router>
      <div className="App">
        <nav className={isTop ? "navbar navbar-on-scroll" : "navbar "}>
          <ul className="navbar__links">
            <Link to="/">
              <li className="navbar__links-item">
                Search movies
            </li>
            </Link>
            <Link to="/moviestowatch">
              <li className="navbar__links-item">
                Movies to watch
            </li>
            </Link>
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
