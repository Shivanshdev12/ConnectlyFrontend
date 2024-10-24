import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080'); // Backend URL
    setSocket(newSocket);

    newSocket.on('notification', (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return { notifications };
};

export default useNotifications;
