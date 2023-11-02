import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/header.scss";

const WATCH_LATER = "WATCH LATER";

const Header = ({ searchMovies, isPlainHomeLink }) => {
  const [ inputValue, setInputValue ] = useState('');
  const { starredMovies } = useSelector((state) => state.starred);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigationToHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleInputChange = (e) => {
    searchMovies(e.target.value);
    setInputValue(e.target.value)
  };

  const handleSearchReset = () => {
    setInputValue('');
    searchMovies('');
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={handleSearchReset} >
        <i className="bi bi-film" />
      </Link>
      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
          onClick={handleSearchReset}
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav" onClick={handleSearchReset}>
          {WATCH_LATER}
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleNavigationToHome}
          className="form-control rounded"
          placeholder="Search for movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;
