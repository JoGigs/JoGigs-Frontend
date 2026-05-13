import api from '../api';
import * as socketService from './socket.service';

export const connect = (forceNew = false) => {
    return socketService.connect(forceNew);
};

export const disconnect = () => {
    socketService.disconnect();
};

export const getNotifications = async () => {
    const response = await api.get('/notifications');
    return response.data;
};

export const markAllAsRead = async () => {
    await api.post('/notifications/read-all');
};

export const markAsRead = async (id) => {
    await api.post(`/notifications/${id}/read`);
};

export const onNotification = (callback) => {
    return socketService.subscribe('notification', callback);
};

export const onBookingUpdate = (callback) => {
    return socketService.subscribe('booking_updated', callback);
};
