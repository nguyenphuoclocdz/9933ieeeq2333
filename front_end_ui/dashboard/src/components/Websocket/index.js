import React, { useEffect } from 'react';
import io from 'socket.io-client';

const WebSocket = () => {
    useEffect(() => {
        // Thiết lập kết nối WebSocket
        const socket = io('ws://localhost:3001');

        // Xử lý các sự kiện từ máy chủ
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('message', (data) => {
            console.log('Received message:', data);
        });

        // Gửi tin nhắn đến máy chủ
        socket.emit('message', 'Hello server');

        // Đảm bảo đóng kết nối khi component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            {/* Nội dung của component */}
        </div>
    );
};

export default WebSocket;
