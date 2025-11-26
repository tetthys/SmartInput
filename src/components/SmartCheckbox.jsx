// src/components/SmartCheckbox.jsx

import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartCheckbox
 * - Checkbox input with SmartInput validation.
 */
export function SmartCheckbox({
  name,
  defaultValue = false,
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
      type="checkbox"
      render={({ value, setValue, validation }) => (
        <div className={className}>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => setValue(e.target.checked)}
              className={inputClassName}
              {...props}
            />
            {label && <span className="ml-2">{label}</span>}
          </label>
          <FieldError validation={validation} className={errorClassName} />
        </div>
      )}
    />
  );
}
