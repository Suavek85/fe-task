import {
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import YouTubeModal from "./components/YoutubeModal";
import MovieTrailerMessage from "./components/MovieTrailerMessage";
import useMovieKey from "./hooks/useMovieKey";
import useYoutubeModal from "./hooks/useYoutubeModal";
import useIntersection from "./hooks/useIntersection";
import useMovieSearch from "./hooks/useMovieSearch";
import "./app.scss";

const App = () => {
  const { lastMovieElementRef } = useIntersection();
  const [videoKey, getMovieKey] = useMovieKey();
  const { isModalOpen, openModal, closeModal } = useYoutubeModal();
  const {
    moviesList,
    fetchStatus,
    searchMovies,
    searchParams,
    setSearchParams
  } = useMovieSearch();

  const viewTrailer = (movie) => {
    getMovieKey(movie.id);
    openModal();
  };

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <main>
        {isModalOpen && (
          <YouTubeModal closeModal={closeModal}>
            {videoKey ? (
              <YouTubePlayer videoKey={videoKey} />
            ) : (
              <MovieTrailerMessage />
            )}
          </YouTubeModal>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={moviesList}
                viewTrailer={viewTrailer}
                lastMovieElementRef={lastMovieElementRef}
                fetchStatus={fetchStatus}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
