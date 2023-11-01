import Movie from "./Movie";
import { FETCH_STATUS } from "../data/moviesSlice";
import "../styles/movies.scss";

const ERROR_MESSAGE = 'There has been an error.';
const LOADING_MESSAGE = 'Loading...';
const NO_MOVIES_MESSAGE = 'No movies found.'

const Movies = ({ movies, viewTrailer, lastMovieElementRef, fetchStatus }) => {
  const renderMovies = () => 
    movies.map((movie, index) => (
      <Movie 
        movie={movie} 
        key={`${movie.id}-${index}`} 
        viewTrailer={viewTrailer} 
      />
    ));

  const renderStatusMessage = () => {
    switch (fetchStatus) {
      case FETCH_STATUS.ERROR:
        return <div>{ERROR_MESSAGE}</div>;
      case FETCH_STATUS.LOADING:
        return <div>{LOADING_MESSAGE}</div>;
      case FETCH_STATUS.SUCCESS:
        return !movies.length && <div>{NO_MOVIES_MESSAGE}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="movies-wrapper" data-testid="movies">
      {renderMovies()}
      {renderStatusMessage()}
      <div ref={lastMovieElementRef}></div>
    </div>
  );
};

export default Movies;
