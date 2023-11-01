import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice, { fetchMovies } from "./data/moviesSlice";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import YouTubeModal from "./components/YoutubeModal";
import MovieTrailerMessage from "./components/MovieTrailerMessage";
import debounce from "./utils/debounce";
import scrollRestore from "./utils/scroll-restore";
import useMovieKey from "./hooks/useMovieKey";
import useIntersection from "./hooks/useIntersection";
import "./app.scss";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const { lastMovieElementRef } = useIntersection(setCurrentPage, currentPage);
  const [videoKey, getMovieKey] = useMovieKey();
  const { moviesList, fetchStatus } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search");
  const { clearMovies } = moviesSlice.actions;

  const closeModal = () => setModalOpen(false);

  const setParams = (query) => {
    if (query !== "") {
      setSearchParams(createSearchParams({ search: query }));
    } else {
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    scrollRestore();
    dispatch(clearMovies());
    setCurrentPage(1);
    setParams(query);
  };

  const getMovies = () => {
    const URL =
      searchQuery && searchQuery.length > 0
        ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${currentPage}`
        : `${ENDPOINT_DISCOVER}&page=${currentPage}`;

    dispatch(fetchMovies(URL));
  };

  const viewTrailer = (movie) => {
    getMovieKey(movie.id);
    setModalOpen(true);
  };

  const debouncedGetMovies = debounce(getMovies, 300);

  useEffect(() => {
    debouncedGetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage]);

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
