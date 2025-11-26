// src/components/SmartText.jsx

import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartText
 * - Text input with SmartInput validation.
 */
export function SmartText({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
      type="text"
      render={({ value, setValue, validation }) => (
        <div className={className}>
          {label && (
            <label className="block mb-1 text-sm font-medium">{label}</label>
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={inputClassName}
            {...props}
          />
          <FieldError validation={validation} className={errorClassName} />
        </div>
      )}
    />
  );
}
