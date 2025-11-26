// src/components/SmartRadio.jsx

import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartRadio
 * - Radio group with SmartInput validation.
 * - options: [{ value, label }]
 */
export function SmartRadio({
  name,
  defaultValue = "",
  label,
  options = [],
  className,
  itemClassName,
  errorClassName,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
      type="radio"
      render={({ value, setValue, validation }) => (
        <div className={className}>
          {label && (
            <div className="block mb-1 text-sm font-medium">{label}</div>
          )}
          <div>
            {options.map((opt) => (
              <label
                key={opt.value}
                className={itemClassName || "inline-flex items-center mr-4"}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => setValue(opt.value)}
                  {...props}
                />
                <span className="ml-1">{opt.label}</span>
              </label>
            ))}
          </div>
          <FieldError validation={validation} className={errorClassName} />
        </div>
      )}
    />
  );
}
