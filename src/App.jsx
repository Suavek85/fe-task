import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import YouTubePlayer from "./components/YoutubePlayer";
import YouTubeModal from "./components/YoutubeModal";
import MovieTrailerMessage from "./components/MovieTrailerMessage";
import useMovieKey from "./hooks/useMovieKey";
import useYoutubeModal from "./hooks/useYoutubeModal";
import "./app.scss";

const App = () => {
  const { videoKey, getMovieKey } = useMovieKey();
  const { isModalOpen, openModal, closeModal } = useYoutubeModal();

  const viewTrailer = (movie) => {
    getMovieKey(movie.id);
    openModal();
  };

  return (
    <div className="App">
      <Header />
      <main>
        {isModalOpen && (
          <YouTubeModal closeModal={closeModal}>
            {videoKey ? (
              <YouTubePlayer videoKey={videoKey} />
            ) : (
              <MovieTrailerMessage />
            )}
          </YouTubeModal>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                viewTrailer={viewTrailer}
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
