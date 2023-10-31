import { useSelector, useDispatch } from "react-redux";
import starredSlice from "../data/starredSlice";
import Movie from "./Movie";
import EmptyCartBlock from "./shared/EmptyCart";
import ActionButton from "./shared/ActionButton";
import "../styles/starred.scss";

const Starred = ({ viewTrailer }) => {
  const { starred } = useSelector((state) => state);
  const { clearAllStarred } = starredSlice.actions;
  const dispatch = useDispatch();

  return (
    <div data-testid="starred">
      {starred.starredMovies.length > 0 && (
        <div data-testid="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="starred-movies-wrapper">
            {starred.starredMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
          <ActionButton
            text="Remove all starred"
            onClickHandler={() => dispatch(clearAllStarred())}
          />
        </div>
      )}

      {starred.starredMovies.length === 0 && (
        <EmptyCartBlock icon="star" message="There are no starred movies." />
      )}
    </div>
  );
};

export default Starred;
