import { io } from 'socket.io-client';

let socket = null;
const listeners = new Map();

export const connect = (forceNew = false) => {
    if (socket && !forceNew) return socket;
    
    if (socket && forceNew) {
        socket.disconnect();
    }

    // Standardizing on a single connection to the root namespace
    socket = io('http://localhost:3000', {
        withCredentials: true,
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
    });

    return socket;
};

export const disconnect = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
        listeners.clear();
    }
};

/**
 * Subscribe to an event. Returns an unsubscribe function.
 */
export const subscribe = (event, callback) => {
    if (!socket) connect();

    socket.on(event, callback);

    // Track for cleanup
    if (!listeners.has(event)) {
        listeners.set(event, new Set());
    }
    listeners.get(event).add(callback);

    return () => {
        socket.off(event, callback);
        listeners.get(event).delete(callback);
    };
};

export const emit = (event, data) => {
    if (!socket) connect();
    socket.emit(event, data);
};

export const getSocket = () => socket;
