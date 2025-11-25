import { SmartField } from "./SmartField";

export const SmartSelect = ({
  name,
  options = [],
  defaultValue,
  className,
}) => (
  <SmartField
    name={name}
    defaultValue={defaultValue}
    type="select"
    options={options}
    render={({ name, value, setValue, validation }) => (
      <div>
        <select
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={className}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {validation?.is_error && <span>{validation.error_message}</span>}
      </div>
    )}
  />
);
