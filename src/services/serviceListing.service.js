import api from "../api/index";

/** Fetch all available service listings (public). */
export const getAllServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

/**
 * Create a new service listing.
 * Access: Professional Only.
 *
 * @param {{ title: string, description: string, price: number }} payload
 */
export const createService = async (payload) => {
  const response = await api.post("/services", payload);
  return response.data;
};

/**
 * Get the services owned by the logged-in professional (dashboard feed).
 * Access: Professional Only.
 */
export const getMyServices = async () => {
  const response = await api.get("/services/my");
  return response.data;
};

/**
 * Delete a service listing.
 * Access: Professional Only (own services only).
 *
 * @param {number} serviceId
 */
export const deleteService = async (serviceId) => {
  const response = await api.delete(`/services/${serviceId}`);
  return response.data;
};

