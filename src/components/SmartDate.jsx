import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartDate
 * - Date input integrated with SmartField.
 */
export function SmartDate({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  onChange,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
      type="date"
      onChange={onChange}
      render={({
        name: fieldName,
        value,
        setValue,
        validation,
        className: wrapperClassName,
        ...fieldProps
      }) => (
        <div className={className || wrapperClassName}>
          {label && (
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor={fieldName}
            >
              {label}
            </label>
          )}
          <input
            {...fieldProps}
            id={fieldName}
            name={fieldName}
            type="date"
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
