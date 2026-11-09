import axios from "axios";

// Development: use Vite's proxy to reach the local backend.
// Production: send requests directly to Railway.
axios.defaults.baseURL = import.meta.env.DEV
  ? ""
  : "https://findmycoffee-production.up.railway.app";
axios.defaults.withCredentials = true;  // Harmless here, helpful if I switch to CORS in the future

export default axios;
