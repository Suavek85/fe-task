import placeholder from "../assets/not-found-500X750.jpeg";

function getMoviePosterURL(poster_path) {
  return poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : placeholder;
}

export default getMoviePosterURL;
