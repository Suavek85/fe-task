import { useEffect, useRef, useState, useCallback } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies } from "./data/moviesSlice";
import {
  ENDPOINT_SEARCH,
  ENDPOINT_DISCOVER,
  ENDPOINT,
  API_KEY,
} from "./constants";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import YouTubeModal from "./components/YoutubeModal";
import { debounce } from "./utils/debounce";
import "./app.scss";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const moviesPerPage = 5;

  const { movies } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const navigate = useNavigate();

  const closeModal = () => setModalOpen(false);

  //console.log('moviesList', moviesList);

  // Problem coming back from the route to Home with filled input

  // const closeCard = () => {};

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading || !initialFetchDone) return;
      if (observer.current) observer.current.disconnect();
      //console.log('totalPages', totalPages);
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting ) {
          console.log("intersecting");
          setIsLoading(true); 
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, initialFetchDone],
  );

  const getSearchResults = (query) => {
    if (query !== "") {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}`));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  /*
  const getMovies = () => {
    if (searchQuery && searchQuery.length >= 2) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}`));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
    }
  };
  */

  //ADD window.scroll to top

  const getMovies = () => {
    //console.log()
    setIsLoading(true);
    if (searchQuery && searchQuery.length > 0) {
      dispatch(
        fetchMovies(
          `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${currentPage}`
        )
      ).finally(() => {
        setIsLoading(false);
        if (!initialFetchDone) setInitialFetchDone(true);
      });
    } else {
      dispatch(
        fetchMovies(
          `${ENDPOINT_DISCOVER}&limit=${moviesPerPage}&page=${currentPage}`
        )
      ).finally(() => {
        setIsLoading(false);
        if (!initialFetchDone) setInitialFetchDone(true);
      });
    }
  };

  const debouncedGetMovies = debounce(getMovies, 300);

  const viewTrailer = (movie) => {
    getMovieKey(movie.id);
    setModalOpen(true);
  };

  const getMovieKey = async (id) => {
    setVideoKey(null);
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    debouncedGetMovies();
  }, [searchQuery, currentPage]);

  console.log('movues', movies)

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <main>
        <YouTubeModal isModalOpen={isModalOpen} closeModal={closeModal}>
          {videoKey ? (
            <YouTubePlayer videoKey={videoKey} />
          ) : (
            <div className="no-movie-message">
              <h6>No trailer available. Try another movie</h6>
            </div>
          )}
        </YouTubeModal>

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                lastMovieElementRef={lastMovieElementRef}
                //closeCard={closeCard}
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
