import React, { useEffect, useState, useRef, useContext } from "react";
import { SmartInputContext } from "./SmartInputProvider";

export function SmartField({
  name,
  type,
  defaultValue,
  onChange,
  render,
  ...props
}) {
  const { socket, sessionId, bootstrap } = useContext(SmartInputContext);

  const [value, setValue] = useState(defaultValue ?? "");
  const isDirty = useRef(false);

  const [validation, setValidation] = useState(null);

  /* -----------------------------------------
   * 1) SmartInput 서버 validation 이벤트 수신
   * ----------------------------------------- */
  useEffect(() => {
    if (!socket) return;

    const handler = (payload) => {
      if (payload.results && payload.results[name]) {
        setValidation(payload.results[name]);
      }
    };

    socket.on("smartinput:validation", handler);
    return () => socket.off("smartinput:validation", handler);
  }, [socket, name]);

  /* -----------------------------------------
   * 2) 서버 bootstrap fields(injected/old 등)
   * ----------------------------------------- */
  useEffect(() => {
    const fields = bootstrap.fields || {};

    const serverField =
      fields.injected?.[name] ?? fields.old?.[name] ?? undefined;

    if (serverField !== undefined) {
      const domValue = type === "checkbox" ? Boolean(serverField) : serverField;

      // 사용자가 건드리지 않았으면 무조건 반영
      if (!isDirty.current) {
        setValue(domValue);
        return;
      }

      // 사용자가 건드렸더라도 서버 origin은 최고 우선권
      isDirty.current = false;
      setValue(domValue);
    }
  }, [bootstrap, name, type]);

  /* -----------------------------------------
   * 3) 로컬 값 변경 시 SmartInput 서버 전송
   * ----------------------------------------- */
  useEffect(() => {
    if (!socket || !sessionId) return;

    // SmartInput 서버에 전송
    socket.emit("smartinput:input", {
      sessionId,
      field_name: name,
      field_value: value,
    });
  }, [value, socket, sessionId, name]);

  /* -----------------------------------------
   * 4) 값 변경 핸들러
   * ----------------------------------------- */
  const setValueSafe = (val) => {
    isDirty.current = true;
    setValue(val);
    if (onChange) onChange(val);
  };

  return render({
    name,
    value,
    setValue: setValueSafe,
    validation,
    ...props,
  });
}
