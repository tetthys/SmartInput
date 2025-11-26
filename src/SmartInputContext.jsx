// src/SmartInputContext.jsx

import React, { createContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";

export const SmartInputContext = createContext({
  socket: null,
  sessionId: null,
});

/**
 * SmartInputProvider
 * - Provides socket.io client and sessionId via context.
 * - Registers sessionId on connect so backend can map session -> socket.
 */
export function SmartInputProvider({
  sessionId,
  socketUrl = "http://localhost:3000",
  children,
}) {
  // Create socket instance only when socketUrl changes
  const socket = useMemo(() => {
    return io(socketUrl, {
      // Do not autoConnect here; we control in effect
      autoConnect: false,
      // CORS / cookie-related options
      withCredentials: true,
      // Explicit transports to avoid some CORS/upgrade issues
      transports: ["websocket", "polling"],
    });
  }, [socketUrl]);

  useEffect(() => {
    if (!socket) return;

    // Connect on mount if not connected
    if (!socket.connected) {
      socket.connect();
    }

    // On connect, register sessionId to backend (for emitToSocket)
    const handleConnect = () => {
      if (sessionId) {
        socket.emit("smartinput:register", { sessionId });
      }
    };

    socket.on("connect", handleConnect);

    // If already connected when effect runs, register immediately
    if (socket.connected) {
      handleConnect();
    }

    // Cleanup on unmount / dependency change
    return () => {
      socket.off("connect", handleConnect);
      socket.disconnect();
    };
  }, [socket, sessionId]);

  return (
    <SmartInputContext.Provider value={{ socket, sessionId }}>
      {children}
    </SmartInputContext.Provider>
  );
}
