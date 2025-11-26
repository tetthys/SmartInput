import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartNumber
 * - Number input integrated with SmartField.
 * - Keeps value as string to avoid NaN issues in controlled inputs.
 */
export function SmartNumber({
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
      type="number"
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
