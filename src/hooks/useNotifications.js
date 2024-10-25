import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_API_URI
    const newSocket = io(`${backendUrl}`); // Backend URL
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
