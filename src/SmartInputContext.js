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
 * - socketUrl 기본값은 개발용 localhost 입니다.
 */
export function SmartInputProvider({
  sessionId,
  socketUrl = "http://localhost:3000",
  children,
}) {
  // Create socket instance only when socketUrl changes
  const socket = useMemo(() => {
    // Do not autoConnect here, control in effect
    return io(socketUrl, { autoConnect: false });
  }, [socketUrl]);

  useEffect(() => {
    // Connect on mount
    if (!socket.connected) {
      socket.connect();
    }

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SmartInputContext.Provider value={{ socket, sessionId }}>
      {children}
    </SmartInputContext.Provider>
  );
}
