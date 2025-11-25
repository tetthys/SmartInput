import { SmartField } from "./SmartField";

export const SmartTextarea = ({ name, defaultValue, className, ...props }) => (
  <SmartField
    name={name}
    defaultValue={defaultValue}
    type="textarea"
    render={({ name, value, setValue, validation }) => (
      <div>
        <textarea
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
