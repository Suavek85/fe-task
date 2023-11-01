import { useSelector, useDispatch } from "react-redux";
import Movie from "./Movie";
import EmptyCartBlock from "./shared/EmptyCart";
import ActionButton from "./shared/ActionButton";
import starredSlice from "../data/starredSlice";
import "../styles/starred.scss";

const STARRED_MOVIES_LIST_HEADER = 'Starred movies';

const Starred = ({ viewTrailer }) => {
  const { starredMovies } = useSelector((state) => state.starred);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  return (
    <div data-testid="starred">
      {starredMovies.length > 0 ? (
        <div data-testid="starred-movies">
          <h6 className="header">{STARRED_MOVIES_LIST_HEADER}</h6>
          <div className="starred-movies-wrapper">
            {starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
          <ActionButton
            text="Remove all starred"
            onClickHandler={() => dispatch(clearAllStarred())}
          />
        </div>
      ) : (
        <EmptyCartBlock icon="star" message="There are no starred movies." />
      )}
    </div>
  );
};

export default Starred;
