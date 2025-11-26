import React, { createContext, useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SmartInputContext = createContext({});

export function SmartInputProvider({
  sessionId,
  socketUrl = "http://localhost:3000",
  children,
}) {
  const socket = useMemo(() => {
    return io(socketUrl, {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
    });
  }, [socketUrl]);

  const [bootstrap, setBootstrap] = useState({
    ui: {},
    flash: {},
    fields: {},
    smartinput: null,
  });

  const updateBootstrap = (data) => {
    setBootstrap((prev) => ({
      ...prev,
      ui: { ...prev.ui, ...(data.ui || {}) },
      flash: { ...prev.flash, ...(data.flash || {}) },
      fields: { ...prev.fields, ...(data.fields || {}) },
      smartinput: data.smartinput || prev.smartinput,
    }));
  };

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.emit("smartinput:register", { sessionId });

    return () => socket.disconnect();
  }, [socket, sessionId]);

  return (
    <SmartInputContext.Provider
      value={{
        socket,
        sessionId,
        bootstrap,
        updateBootstrap,
      }}
    >
      {children}
    </SmartInputContext.Provider>
  );
}
