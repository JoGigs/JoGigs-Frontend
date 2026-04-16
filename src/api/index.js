import axios from "axios";

/**
 * Central Axios instance.
 * All services import from here — never create a second axios.create().
 */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// ── Response interceptor ─────────────────────────────────────────────────────
// Silently refreshes the access token on 401 and retries the original request.
// If the refresh itself fails, the user is logged out and redirected to /login.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.get("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("loggedIn");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
