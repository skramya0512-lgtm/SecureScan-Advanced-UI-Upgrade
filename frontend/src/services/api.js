import axios from "axios";

const api = axios.create({
  // Production requests use Netlify's /api redirect.
  // Local development continues to use localhost:5000.
  baseURL: import.meta.env.VITE_API_BASE_URL || (
    import.meta.env.PROD ? "/api" : "http://localhost:5000/api"
  ),
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.userMessage =
        "The server took too long to respond. Please try again.";
    } else if (!error.response) {
      error.userMessage =
        "Cannot reach the SecureScan server. Check the API configuration.";
    }

    return Promise.reject(error);
  }
);

export default api;