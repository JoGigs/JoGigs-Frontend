import * as socketService from './socket.service';

export const connect = (forceNew = false) => {
    return socketService.connect(forceNew);
};

export const disconnect = () => {
    socketService.disconnect();
};

export const sendMessage = (receiverId, content) => {
    socketService.emit('sendMessage', { receiverId, content });
};

export const markAsRead = (withUserId) => {
    socketService.emit('markAsRead', { withUserId });
};

export const getConversation = (withUserId) => {
    socketService.emit('getConversation', { withUserId });
};

export const getConversationList = () => {
    socketService.emit('getConversationList');
};

// Event Listeners
export const onNewMessage = (cb) => {
    return socketService.subscribe('newMessage', cb);
};

export const onConversationList = (cb) => {
    return socketService.subscribe('conversationList', cb);
};

export const onConversationHistory = (cb) => {
    return socketService.subscribe('conversationHistory', cb);
};

export const onMessageSent = (cb) => {
    return socketService.subscribe('messageSent', cb);
};

export const onMessagesRead = (cb) => {
    return socketService.subscribe('messagesRead', cb);
};

export const getSocket = () => socketService.getSocket();
