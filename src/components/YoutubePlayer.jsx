import ReactPlayer from "react-player";

const YoutubePlayer = ({ videoKey }) => (
  <ReactPlayer
    className="video-player"
    url={`https://www.youtube.com/watch?v=${videoKey}`}
    width='100%'
    controls
    playing
    data-testid="youtube-player"
  />
);

export default YoutubePlayer;
