import { useSelector, useDispatch } from "react-redux";
import watchLaterSlice from "../data/watchLaterSlice";
import Movie from "./Movie";
import EmptyCartBlock from "./shared/EmptyCart";
import ActionButton from "./shared/ActionButton";
import "../styles/watchlater.scss";

const WATCH_LATER_LIST_HEADER = 'Watch Later List';

const WatchLater = ({ viewTrailer }) => {
  const { watchLaterMovies } = useSelector((state) => state.watchLater);
  const { remveAllWatchLater } = watchLaterSlice.actions;
  const dispatch = useDispatch();

  return (
    <div data-testid="watch-later">
      {watchLaterMovies.length > 0 ? (
        <div data-testid="watch-later-movies">
          <h6 className="header">{WATCH_LATER_LIST_HEADER}</h6>
          <div className="watch-later-wrapper">
            {watchLaterMovies.map((movie) => (
              <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
            ))}
          </div>
          <ActionButton
            text="Empty list"
            onClickHandler={() => dispatch(remveAllWatchLater())}
          />
        </div>
      ) : (
        <EmptyCartBlock
          icon="heart"
          message="You have no movies saved to watch later."
        />
      )}
    </div>
  );
};

export default WatchLater;
