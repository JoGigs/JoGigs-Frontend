import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
  withCredentials: true, 
});


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

export const signIn = async (credentials) => {
  const response = await api.post("/auth/signin", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};
export const signUp = async (userData) => {
    
    const response = await api.post("/auth/signup", userData);
    return response.data;
};

export default api;