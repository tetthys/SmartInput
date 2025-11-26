import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartPassword
 * - Password input integrated with SmartField (SmartInput).
 */
export function SmartPassword({
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
      type="password"
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
            type="password"
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
