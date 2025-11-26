// src/components/SmartSelect.jsx

import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartSelect
 * - Select box with SmartInput validation.
 * - options: [{ value, label }]
 */
export function SmartSelect({
  name,
  defaultValue = "",
  label,
  options = [],
  className,
  selectClassName,
  errorClassName,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
      render={({ value, setValue, validation }) => (
        <div className={className}>
          {label && (
            <label className="block mb-1 text-sm font-medium">{label}</label>
          )}
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={selectClassName}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <FieldError validation={validation} className={errorClassName} />
        </div>
      )}
    />
  );
}
