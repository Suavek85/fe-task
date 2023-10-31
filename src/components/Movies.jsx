import Movie from "./Movie";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer, lastMovieElementRef }) => {
  return (
    <div className="movies-wrapper" data-testid="movies">
      {movies.movies.map((movie) => {
        return (
          <Movie
            movie={movie}
            key={movie.id}
            viewTrailer={viewTrailer}
          />
        );
      })}
      <div ref={lastMovieElementRef}></div>
    </div>
  );
};

export default Movies;
