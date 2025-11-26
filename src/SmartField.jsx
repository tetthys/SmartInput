// src/SmartField.jsx

import React, { useEffect, useState, useCallback } from "react";
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
  onChange, // 부모가 넘기는 onChange
  ...props
}) {
  const [value, setValue] = useState(
    type === "checkbox" ? Boolean(defaultValue) : defaultValue ?? ""
  );

  const { sendInput, validation } = useSmartInput(name);

  // Local setter that also calls parent onChange if provided
  const setValueAndNotify = useCallback(
    (nextValue) => {
      setValue(nextValue);
      if (typeof onChange === "function") {
        // 부모 onChange 에게도 알리고 싶으면 여기서 호출
        // 부모 쪽에서 e.target.value 같은 게 필요 없고,
        // 단순 값만 필요하다면 (nextValue)를 넘기는 쪽이 더 안전합니다.
        onChange(nextValue);
      }
    },
    [onChange]
  );

  useEffect(() => {
    sendInput(value);
  }, [value, sendInput]);

  return render({
    name,
    value,
    setValue: setValueAndNotify,
    validation,
    options,
    className,
    ...props,
  });
}
