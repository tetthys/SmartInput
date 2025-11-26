// src/useSmartInput.js

import { useEffect, useState, useContext, useCallback } from "react";
import { SmartInputContext } from "./SmartInputContext";

/**
 * useSmartInput
 * - Listens to "smartinput:validation" events for a specific field.
 * - Emits "smartinput:input" when sendInput is called.
 */
export function useSmartInput(name) {
  const { socket, sessionId } = useContext(SmartInputContext);
  const [validation, setValidation] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handler = (data) => {
      if (data && data.results && data.results[name]) {
        setValidation(data.results[name]);
      }
    };

    socket.on("smartinput:validation", handler);

    // Cleanup: remove handler on unmount or when dependencies change
    return () => {
      socket.off("smartinput:validation", handler);
    };
  }, [socket, name]);

  const sendInput = useCallback(
    (value) => {
      if (!socket || !sessionId) return;

      // Optionally check connection state; if needed:
      // if (!socket.connected) return;

      socket.emit("smartinput:input", {
        sessionId,
        field_name: name,
        field_value: value,
      });
    },
    [socket, sessionId, name]
  );

  return { sendInput, validation };
}
