import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartTextarea
 * - Textarea integrated with SmartField.
 */
export function SmartTextarea({
  name,
  defaultValue = "",
  label,
  className,
  textareaClassName,
  errorClassName,
  onChange,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
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
          <textarea
            {...fieldProps}
            id={fieldName}
            name={fieldName}
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
