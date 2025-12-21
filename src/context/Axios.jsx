import axios from "axios";

axios.defaults.baseURL = "/";           // Vite proxy will forward /api to backend -> Means “start requests from the site root” -> Vite proxy is what actually forwards /api to the backend.
axios.defaults.withCredentials = true;  // Harmless here, helpful if I switch to CORS in the future

export default axios;