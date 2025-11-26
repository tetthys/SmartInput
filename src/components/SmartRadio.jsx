import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartRadio
 * - Radio group integrated with SmartField.
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
  onChange,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
      type="radio"
      options={options}
      onChange={onChange}
      render={({
        name: fieldName,
        value,
        setValue,
        validation,
        options: fieldOptions,
        className: wrapperClassName,
        ...fieldProps
      }) => (
        <div className={className || wrapperClassName}>
          {label && (
            <div className="block mb-1 text-sm font-medium">{label}</div>
          )}
          <div>
            {fieldOptions.map((opt) => (
              <label
                key={opt.value}
                className={itemClassName || "inline-flex items-center mr-4"}
              >
                <input
                  {...fieldProps}
                  type="radio"
                  name={fieldName}
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
