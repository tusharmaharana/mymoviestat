import axios from 'axios';

const KEY = process.env.REACT_APP_OMDB_API_KEY;

const omdb = restParams =>
  axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: KEY,
      ...restParams
    }
  });

export default omdb;
