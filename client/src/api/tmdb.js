import axios from 'axios';

const KEY = 'e024fb9858bdfadae5dc7a5a5c7d26fc';

const tmdb = (url, restParams) =>
  axios.get(`https://api.themoviedb.org/3${url}`, {
    params: {
      api_key: KEY,
      ...restParams
    }
  });

export default tmdb;
