import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { FETCH_STATUS } from "../data/moviesSlice";

const useIntersection = (setCurrentPage, currentPage) => {
  const { totalPages, fetchStatus } = useSelector((state) => state.movies);
  const observer = useRef();

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
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCurrentPage, totalPages, fetchStatus]
  );

  return { lastMovieElementRef };
};

export default useIntersection;


