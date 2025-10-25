import axios from "axios";

axios.defaults.baseURL = "/";           // Vite proxy will forward /api to backend
axios.defaults.withCredentials = true;  // Harmless here, helpful if I switch to CORS

export default axios;