import { createContext } from "react";
import { io } from "socket.io-client";

export const SmartInputContext = createContext({});

export const SmartInputProvider = ({ sessionId, children }) => {
  const socket = io("http://localhost:3000", { autoConnect: true });
  return (
    <SmartInputContext.Provider value={{ socket, sessionId }}>
      {children}
    </SmartInputContext.Provider>
  );
};
