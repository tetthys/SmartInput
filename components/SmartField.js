import React, { useEffect, useState } from "react";
import { useSmartInput } from "./useSmartInput";

export const SmartField = ({
  name,
  defaultValue,
  render,
  type,
  options,
  className,
  ...props
}) => {
  const [value, setValue] = useState(
    type === "checkbox" ? Boolean(defaultValue) : defaultValue ?? ""
  );
  const { sendInput, validation } = useSmartInput(name, defaultValue);

  useEffect(() => {
    sendInput(value);
  }, [value]);

  return render({
    name,
    value,
    setValue,
    validation,
    options,
    className,
    ...props,
  });
};
