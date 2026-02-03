

import api from "./auth.api"; 

export const getAllServices = async () => {
  const response = await api.get("/services");
  return response.data;
};
