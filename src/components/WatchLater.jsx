import { useSelector, useDispatch } from "react-redux";
import watchLaterSlice from "../data/watchLaterSlice";
import Movie from "./Movie";
import EmptyCartBlock from "./shared/EmptyCart";
import ActionButton from "./shared/ActionButton";
import "../styles/watchlater.scss";

const WatchLater = ({ viewTrailer }) => {
  const { watchLater } = useSelector((state) => state);
  const { remveAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  return (
    <div data-testid="watch-later">
      {watchLater.watchLaterMovies.length > 0 && (
        <div data-testid="watch-later-movies">
          <h6 className="header">Watch Later List</h6>
          <div className="watch-later-wrapper">
            {watchLater.watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
          <ActionButton
            text="Empty list"
            onClickHandler={() => dispatch(remveAllWatchLater())}
          />
        </div>
      )}
      {watchLater.watchLaterMovies.length === 0 && (
        <EmptyCartBlock
          icon="heart"
          message="You have no movies saved to watch later."
        />
      )}
    </div>
  );
};

export default WatchLater;
