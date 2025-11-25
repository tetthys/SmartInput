import { SmartField } from "./SmartField";

export const SmartDate = ({ name, defaultValue, className, ...props }) => (
  <SmartField
    name={name}
    defaultValue={defaultValue}
    type="date"
    render={({ name, value, setValue, validation }) => (
      <div>
        <input
          type="date"
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={className}
          {...props}
        />
        {validation?.is_error && <span>{validation.error_message}</span>}
      </div>
    )}
  />
);
