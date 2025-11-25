import { SmartField } from "./SmartField";

export const SmartCheckbox = ({ name, defaultValue, className, ...props }) => (
  <SmartField
    name={name}
    defaultValue={defaultValue}
    type="checkbox"
    render={({ name, value, setValue, validation, ...rest }) => (
      <div>
        <input
          type="checkbox"
          name={name}
          checked={value}
          onChange={() => setValue(!value)}
          className={className}
          {...rest}
        />
        {validation?.is_error && <span>{validation.error_message}</span>}
      </div>
    )}
  />
);
