import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/header.scss";

const WATCH_LATER = "WATCH LATER";

const Header = ({ searchMovies }) => {
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
  };

  return (
    <header>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>
      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
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
        <NavLink to="/watch-later" className="nav-fav">
          {WATCH_LATER}
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
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
