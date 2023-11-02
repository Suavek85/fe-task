import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moviesSlice, { fetchMovies } from "../data/moviesSlice";
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from "../constants";
import debounce from "../utils/debounce";
import scrollRestore from "../utils/scroll-restore";

const useMovieSearch = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { moviesList, currentPage } = useSelector((state) => state.movies);
  const searchQuery = searchParams.get("search");
  const { clearMovies } = moviesSlice.actions;

  const setParams = (query) => {
    if (query === "") {
      setSearchParams(new URLSearchParams());
    } else {
      setSearchParams(new URLSearchParams({ search: query }));
    }
  };

  const searchMovies = (query) => {
    scrollRestore();
    if (query || searchQuery) {
      dispatch(clearMovies());
      setParams(query);
    }   
  };

  const getMovies = () => {
    const URL =
      searchQuery && searchQuery.length > 0
        ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${currentPage}`
        : `${ENDPOINT_DISCOVER}&page=${currentPage}`;

    dispatch(fetchMovies(URL));
  };

  const debouncedGetMovies = debounce(getMovies, 300);

  useEffect(() => {
    debouncedGetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage]);

  return {
    moviesList,
    searchMovies,
  };
};

export default useMovieSearch;
