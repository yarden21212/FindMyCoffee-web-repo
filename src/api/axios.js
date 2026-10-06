import axios from 'axios';

export default axios.create({
  baseURL: 'https://findmycoffee-production.up.railway.app',
  withCredentials: true
});