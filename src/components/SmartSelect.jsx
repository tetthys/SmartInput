import React from "react";
import { SmartField } from "../SmartField";
import { FieldError } from "./FieldError";

/**
 * SmartSelect
 * - Select box integrated with SmartField.
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
  onChange,
  ...props
}) {
  return (
    <SmartField
      name={name}
      defaultValue={defaultValue}
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
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor={fieldName}
            >
              {label}
            </label>
          )}
          <select
            {...fieldProps}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={selectClassName}
            {...props}
          >
            {fieldOptions.map((opt) => (
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
