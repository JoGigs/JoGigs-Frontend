import { io } from "socket.io-client";

// ── Singleton socket instance ────────────────────────────────────────────────
// The socket is lazily created the first time connect() is called.
// The browser automatically sends the HttpOnly access_token cookie on
// the WebSocket handshake — no manual auth header needed.

let socket = null;

/**
 * Connect to the /chat namespace.
 * Safe to call multiple times — returns the existing socket if already open.
 */
export const connect = () => {
  if (socket?.connected) return socket;

  socket = io("http://localhost:3000/chat", {
    withCredentials: true, // sends HttpOnly cookies on handshake
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("[Chat] Connected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("[Chat] Connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.warn("[Chat] Disconnected:", reason);
  });

  return socket;
};

/**
 * Disconnect and destroy the socket instance.
 * Call this when the user logs out or leaves the chat area entirely.
 */
export const disconnect = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Send a message to another user.
 *
 * @param {number} receiverId  - The recipient's user ID.
 * @param {string} content     - The message text.
 */
export const sendMessage = (receiverId, content) => {
  getSocket().emit("sendMessage", { receiverId, content });
};

/**
 * Request the full conversation history with a specific user.
 *
 * @param {number} withUserId
 */
export const getConversation = (withUserId) => {
  getSocket().emit("getConversation", { withUserId });
};

/**
 * Request the list of all active conversations (latest message per chat).
 */
export const getConversationList = () => {
  getSocket().emit("getConversationList");
};

// ── Event listeners ──────────────────────────────────────────────────────────

/**
 * Listen for confirmation that a sent message was saved by the server.
 * @param {Function} callback - Receives the saved Message object.
 */
export const onMessageSent = (callback) => {
  getSocket().on("messageSent", callback);
};

/**
 * Listen for incoming messages from other users in real time.
 * @param {Function} callback - Receives the incoming Message object.
 */
export const onNewMessage = (callback) => {
  getSocket().on("newMessage", callback);
};

/**
 * Listen for the conversation history response.
 * @param {Function} callback - Receives Message[].
 */
export const onConversationHistory = (callback) => {
  getSocket().on("conversationHistory", callback);
};

/**
 * Listen for the conversation list response.
 * @param {Function} callback - Receives Message[] (one per conversation).
 */
export const onConversationList = (callback) => {
  getSocket().on("conversationList", callback);
};

/**
 * Remove all listeners registered by this service from the socket.
 * Call this in a Vue component's beforeUnmount() to prevent memory leaks.
 */
export const removeAllListeners = () => {
  if (!socket) return;
  ["messageSent", "newMessage", "conversationHistory", "conversationList"].forEach(
    (event) => socket.off(event)
  );
};

// ── Internal helper ──────────────────────────────────────────────────────────

/**
 * Returns the active socket, connecting first if necessary.
 * @returns {import("socket.io-client").Socket}
 */
const getSocket = () => {
  if (!socket?.connected) return connect();
  return socket;
};
