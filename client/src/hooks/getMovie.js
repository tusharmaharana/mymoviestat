import tmdb from '../api/omdb';
// import { renameKey } from '../utils/renameKey';
// import getData from './getData';

const getMovie = async selectedMovie => {
  let movie;
  try {
    // const response = await getData(`movies/${selectedMovie?.imdbID}`);
    // if (response !== 404) movie = response;
    // else {
    try {
      const movieDetailRes = await tmdb(`/movie/${selectedMovie?.id}`);
      movie = movieDetailRes.data;
      const movieCreditsRes = await tmdb(`/movie/${selectedMovie?.id}/credits`);
      movie = { ...movie, ...movieCreditsRes.data };
      // const data = renameKey(res.data);
      // movie = await getData('movies/', { body: data });
    } catch (err) {
      console.error(err);
    }
    // }
  } catch (err) {
    console.error(err);
  }
  return movie;
};

export default getMovie;
