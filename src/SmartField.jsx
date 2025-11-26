// src/SmartField.jsx

import React, { useEffect, useState } from "react";
import { useSmartInput } from "./useSmartInput";

/**
 * SmartField
 * - Manages local value state
 * - Sends value to SmartInput server via socket
 * - Provides validation result to render prop
 */
export function SmartField({
  name,
  defaultValue,
  render,
  type,
  options,
  className,
  ...props
}) {
  const [value, setValue] = useState(
    type === "checkbox" ? Boolean(defaultValue) : defaultValue ?? ""
  );

  const { sendInput, validation } = useSmartInput(name);

  useEffect(() => {
    sendInput(value);
  }, [value, sendInput]);

  return render({
    name,
    value,
    setValue,
    validation,
    options,
    className,
    ...props,
  });
}
