import { useState } from "react";
import { ENDPOINT, API_KEY } from "../constants";

const useMovieKey = () => {
  const [videoKey, setVideoKey] = useState(null);

  const getMovieKey = async (id) => {
    setVideoKey(null);
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

    const videoData = await fetch(URL).then((response) => response.json());

    if (videoData?.videos?.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === "Trailer"
      );
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  return { videoKey, getMovieKey };
};

export default useMovieKey;