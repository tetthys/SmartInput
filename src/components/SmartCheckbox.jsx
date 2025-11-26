import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartCheckbox
 * - Checkbox integrated with SmartField.
 */
export function SmartCheckbox({
  name,
  defaultValue = false,
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
      type="checkbox"
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
          <label className="inline-flex items-center">
            <input
              {...fieldProps}
              id={fieldName}
              name={fieldName}
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
