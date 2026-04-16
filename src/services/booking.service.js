import api from "../api/index";

// ── Customer endpoints ───────────────────────────────────────────────────────

/**
 * Create a booking request for a service listing.
 * Access: Customer Only.
 *
 * @param {number} serviceListingId
 */
export const createBooking = async (serviceListingId) => {
  const response = await api.post("/bookings", { serviceListingId });
  return response.data; // Booking object with status "pending"
};

/**
 * Get all bookings made by the logged-in customer.
 * Access: Customer Only.
 */
export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");
  return response.data; // Booking[] with populated serviceListing
};

// ── Professional endpoints ───────────────────────────────────────────────────

/**
 * Get all booking requests placed on the professional's services.
 * Access: Professional Only.
 */
export const getMyJobs = async () => {
  const response = await api.get("/bookings/my-jobs");
  return response.data; // Booking[] with populated serviceListing + customer
};

/**
 * Accept or decline a pending booking.
 * Access: Professional Only.
 *
 * @param {number} bookingId
 * @param {"accepted"|"declined"} status
 */
export const respondToBooking = async (bookingId, status) => {
  const response = await api.patch(`/bookings/${bookingId}/respond`, { status });
  return response.data;
};

/**
 * Mark an accepted booking as completed.
 * Access: Professional Only.
 *
 * @param {number} bookingId
 */
export const completeBooking = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}/complete`);
  return response.data;
};
