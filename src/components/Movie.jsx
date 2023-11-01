import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import getMoviePosterURL from "../utils/get-tmdb-poster-url";
import "../styles/movie.scss";

const WATCH_LATER = 'Watch Later';
const VIEW_TRAILER = 'View Trailer';

const Movie = ({ movie, viewTrailer }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { starredMovies } = useSelector((state) => state.starred);
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const dispatch = useDispatch();

  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const { id, overview, release_date, poster_path, title } = movie;

  const isStarred = starredMovies.some(m => m.id === id);
  const isWatchLater = watchLaterMovies.some(m => m.id === id);
  
  const handleClosingCard = (e) => {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setIsOpened(false);
  };

  return (
    <div className="movie-card-wrapper">
      <article
        className={`movie-card ${isOpened ? "opened" : ""}`}
        onClick={() => setIsOpened(true)}
      >
        <div className="movie-card__body">
          <div className="movie-card__overlay" />
          <div className="movie-card__info_panel">
            <div className="overview">{overview}</div>
            <div className="year">{release_date?.substring(0, 4)}</div>
            {!isStarred ? (
              <span
                className="btn-star"
                data-testid="starred-link"
                onClick={() =>
                  dispatch(
                    starMovie({
                      id,
                      overview,
                      release_date: release_date?.substring(0, 4),
                      poster_path,
                      title,
                    })
                  )
                }
              >
                <i className="bi bi-star" />
              </span>
            ) : (
              <span
                className="btn-star"
                data-testid="unstar-link"
                onClick={() => dispatch(unstarMovie(movie))}
              >
                <i className="bi bi-star-fill" data-testid="star-fill" />
              </span>
            )}
            <div className="bottom-buttons-group">
              {!isWatchLater ? (
                <button
                  type="button"
                  data-testid="watch-later"
                  className="btn btn-light btn-watch-later"
                  onClick={() =>
                    dispatch(
                      addToWatchLater({
                        id,
                        overview,
                        release_date: release_date?.substring(0, 4),
                        poster_path,
                        title,
                      })
                    )
                  }
                >
                  {WATCH_LATER}
                </button>
              ) : (
                <button
                  type="button"
                  data-testid="remove-watch-later"
                  className="btn btn-light btn-watch-later blue"
                  onClick={() => dispatch(removeFromWatchLater(movie))}
                >
                  <i className="bi bi-check"></i>
                </button>
              )}
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => viewTrailer(movie)}
              >
                {VIEW_TRAILER}
              </button>
            </div>
          </div>
          <img
            className="center-block"
            src={getMoviePosterURL(poster_path)}
            alt="Movie poster"
          />
        </div>
        <h6 className="title">{title}</h6>
        <h6 className="title mobile-card">{title}</h6>
        <button
          type="button"
          className="close"
          onClick={handleClosingCard}
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </article>
    </div>
  );
};

export default Movie;
