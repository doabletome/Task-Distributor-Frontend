import axios from "axios";

// Create an axios instance with a default base URL for API requests
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:5000/api", // Backend base URL
});

// Attach a request interceptor to include JWT token in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add Authorization header if token exists
  }
  return config; // Return the modified config
});

// Export the configured axios instance for use across the app
export default api;
