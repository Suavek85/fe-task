import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import moviesSlice, { FETCH_STATUS } from "../data/moviesSlice";

const useIntersection = () => {
  const { totalPages, fetchStatus, currentPage } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const observer = useRef();

  const { setCurrentPage } = moviesSlice.actions;

  const updateCurrentPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const lastMovieElementRef = useCallback(
    (node) => {
      if (fetchStatus !== FETCH_STATUS.SUCCESS) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          totalPages !== 0 &&
          currentPage < totalPages
        ) {
          updateCurrentPage();
        }
      });
      if (node) observer.current.observe(node);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [totalPages, fetchStatus]
  );

  return { lastMovieElementRef };
};

export default useIntersection;


