import Axios from 'axios';

const axios = Axios.create({
  baseURL: '/',
  timeout: 5000,
  headers: {
  }
});

export default axios;
