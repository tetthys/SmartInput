import { SmartField } from "./SmartField";

export const SmartText = ({ name, defaultValue, className, ...props }) => (
  <SmartField
    name={name}
    defaultValue={defaultValue}
    type="text"
    className={className}
    render={({ name, value, setValue, validation, ...rest }) => (
      <div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={className}
          {...rest}
        />
        {validation?.is_error && <span>{validation.error_message}</span>}
      </div>
    )}
  />
);
