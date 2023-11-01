import "../styles/movietrailermessage.scss";

const NO_TRAILER_TEXT = 'No trailer available. Try another movie.'

const MovieTrailerMessage = () => (
  <div className="no-trailer-message">
    <h6>{NO_TRAILER_TEXT}</h6>
  </div>
);

export default MovieTrailerMessage;
