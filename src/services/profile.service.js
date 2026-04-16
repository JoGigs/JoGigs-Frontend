import api from "../api/index";

/**
 * Get the authenticated user's own profile.
 * Access: Any authenticated role.
 */
export const getMyProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

/**
 * Update the authenticated user's profile.
 * All fields are optional. To change password, provide both
 * `currentPassword` and `newPassword`.
 *
 * @param {Object} payload - { fullName?, location?, currentPassword?, newPassword? }
 */
export const updateProfile = async (payload) => {
  const response = await api.patch("/profile", payload);
  return response.data;
};
