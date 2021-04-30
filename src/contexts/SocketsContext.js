import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import socketIOClient from "socket.io-client";
const SocketContext = React.createContext();

const useSocket = () => {
  return useContext(SocketContext);
};
const SocketsProvider = ({ children }) => {
  // const ENDPOINT = "http://127.0.0.1:5000/";
  const user = useSelector((state) => state.user);
  const {
    userInfo: { userId },
  } = user;
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState("");

  useEffect(async () => {
    const newSocket = await io(
      process.env.SERVER_PORT || "http://localhost:5000",
      { query: { userId } }
    );
    // newSocket.on("connect", function () {
    //   console.log("check 2", newSocket.connected);
    // });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [userId]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketsProvider, useSocket };
