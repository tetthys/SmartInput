import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartText
 * - Text input integrated with SmartField (SmartInput).
 */
export function SmartText({
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
      type="text"
      onChange={onChange} // receives nextValue from SmartField
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
