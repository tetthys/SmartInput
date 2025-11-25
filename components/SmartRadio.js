import { SmartField } from "./SmartField";

export const SmartRadio = ({ name, options = [], defaultValue, className }) => (
  <SmartField
    name={name}
    defaultValue={defaultValue}
    type="radio"
    options={options}
    render={({ name, value, setValue, validation }) => (
      <div>
        {options.map((opt) => (
          <label key={opt.value}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => setValue(opt.value)}
              className={className}
            />
            {opt.label}
          </label>
        ))}
        {validation?.is_error && <span>{validation.error_message}</span>}
      </div>
    )}
  />
);
