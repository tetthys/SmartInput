// src/components/SmartTextarea.jsx

import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartTextarea
 * - Textarea with SmartInput validation.
 */
export function SmartTextarea({
  name,
  defaultValue = "",
  label,
  className,
  textareaClassName,
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
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={textareaClassName}
            {...props}
          />
          <FieldError validation={validation} className={errorClassName} />
        </div>
      )}
    />
  );
}
