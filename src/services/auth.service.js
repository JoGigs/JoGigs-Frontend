import api from "../api/index";

/** Sign in an existing user */
export const signIn = async (credentials) => {
  const response = await api.post("/auth/signin", credentials);
  return response.data;
};

/** Sign up a new user */
export const signUp = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

/** Log the current user out */
export const logout = async () => {
  const response = await api.get("/auth/logout");
  return response.data;
};
