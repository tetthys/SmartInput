// src/components/SmartNumber.jsx

import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartNumber
 * - Number input with SmartInput validation.
 */
export function SmartNumber({
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
      type="number"
      render={({ value, setValue, validation }) => (
        <div className={className}>
          {label && (
            <label className="block mb-1 text-sm font-medium">{label}</label>
          )}
          <input
            type="number"
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
