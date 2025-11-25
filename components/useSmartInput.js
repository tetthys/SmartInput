import { useEffect, useState, useContext } from "react";
import { SmartInputContext } from "./SmartInputProvider";

export function useSmartInput(name, defaultValue) {
  const { socket, sessionId } = useContext(SmartInputContext);
  const [validation, setValidation] = useState({});

  useEffect(() => {
    if (!socket) return;
    socket.on("smartinput:validation", (data) => {
      if (data?.results?.[name]) {
        setValidation(data.results[name]);
      }
    });
  }, [socket, name]);

  const sendInput = (value) => {
    if (!socket) return;
    socket.emit("smartinput:input", {
      sessionId,
      field_name: name,
      field_value: value,
    });
  };

  return { sendInput, validation };
}
