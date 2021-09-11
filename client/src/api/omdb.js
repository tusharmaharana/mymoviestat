import axios from 'axios';

const KEY = 'd2407aec';

const omdb = restParams =>
  axios.get('https://www.omdbapi.com/', {
    params: {
      apikey: KEY,
      ...restParams
    }
  });

export default omdb;
