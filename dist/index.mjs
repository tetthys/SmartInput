// src/SmartInputContext.jsx
import React, { createContext, useMemo, useEffect } from "react";
import { io } from "socket.io-client";
var SmartInputContext = createContext({
  socket: null,
  sessionId: null
});
function SmartInputProvider({
  sessionId,
  socketUrl = "http://localhost:3000",
  children
}) {
  const socket = useMemo(() => {
    return io(socketUrl, { autoConnect: false });
  }, [socketUrl]);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return /* @__PURE__ */ React.createElement(SmartInputContext.Provider, { value: { socket, sessionId } }, children);
}

// src/useSmartInput.js
import { useEffect as useEffect2, useState, useContext, useCallback } from "react";
function useSmartInput(name) {
  const { socket, sessionId } = useContext(SmartInputContext);
  const [validation, setValidation] = useState(null);
  useEffect2(() => {
    if (!socket) return;
    const handler = (data) => {
      if (data && data.results && data.results[name]) {
        setValidation(data.results[name]);
      }
    };
    socket.on("smartinput:validation", handler);
    return () => {
      socket.off("smartinput:validation", handler);
    };
  }, [socket, name]);
  const sendInput = useCallback(
    (value) => {
      if (!socket || !sessionId) return;
      socket.emit("smartinput:input", {
        sessionId,
        field_name: name,
        field_value: value
      });
    },
    [socket, sessionId, name]
  );
  return { sendInput, validation };
}

// src/SmartField.jsx
import React2, { useEffect as useEffect3, useState as useState2 } from "react";
function SmartField({
  name,
  defaultValue,
  render,
  type,
  options,
  className,
  ...props
}) {
  const [value, setValue] = useState2(
    type === "checkbox" ? Boolean(defaultValue) : defaultValue ?? ""
  );
  const { sendInput, validation } = useSmartInput(name);
  useEffect3(() => {
    sendInput(value);
  }, [value, sendInput]);
  return render({
    name,
    value,
    setValue,
    validation,
    options,
    className,
    ...props
  });
}

// src/components/SmartCheckbox.jsx
import React4 from "react";

// src/components/FieldError.jsx
import React3 from "react";
function FieldError({ validation, className }) {
  if (!validation || !validation.is_error || !validation.error_message) {
    return null;
  }
  return /* @__PURE__ */ React3.createElement("div", { className: className || "text-red-500 text-sm mt-1" }, validation.error_message);
}

// src/components/SmartCheckbox.jsx
function SmartCheckbox({
  name,
  defaultValue = false,
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React4.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "checkbox",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React4.createElement("div", { className }, /* @__PURE__ */ React4.createElement("label", { className: "inline-flex items-center" }, /* @__PURE__ */ React4.createElement(
        "input",
        {
          type: "checkbox",
          checked: Boolean(value),
          onChange: (e) => setValue(e.target.checked),
          className: inputClassName,
          ...props
        }
      ), label && /* @__PURE__ */ React4.createElement("span", { className: "ml-2" }, label)), /* @__PURE__ */ React4.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartDate.jsx
import React5 from "react";
function SmartDate({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React5.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "date",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React5.createElement("div", { className }, label && /* @__PURE__ */ React5.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React5.createElement(
        "input",
        {
          type: "date",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ React5.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartNumber.jsx
import React6 from "react";
function SmartNumber({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React6.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "number",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React6.createElement("div", { className }, label && /* @__PURE__ */ React6.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React6.createElement(
        "input",
        {
          type: "number",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ React6.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartPassword.jsx
import React7 from "react";
function SmartPassword({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React7.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "password",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React7.createElement("div", { className }, label && /* @__PURE__ */ React7.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React7.createElement(
        "input",
        {
          type: "password",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ React7.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartRadio.jsx
import React8 from "react";
function SmartRadio({
  name,
  defaultValue = "",
  label,
  options = [],
  className,
  itemClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React8.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "radio",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React8.createElement("div", { className }, label && /* @__PURE__ */ React8.createElement("div", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React8.createElement("div", null, options.map((opt) => /* @__PURE__ */ React8.createElement(
        "label",
        {
          key: opt.value,
          className: itemClassName || "inline-flex items-center mr-4"
        },
        /* @__PURE__ */ React8.createElement(
          "input",
          {
            type: "radio",
            name,
            value: opt.value,
            checked: value === opt.value,
            onChange: () => setValue(opt.value),
            ...props
          }
        ),
        /* @__PURE__ */ React8.createElement("span", { className: "ml-1" }, opt.label)
      ))), /* @__PURE__ */ React8.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartText.jsx
import React9 from "react";
function SmartText({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React9.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "text",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React9.createElement("div", { className }, label && /* @__PURE__ */ React9.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React9.createElement(
        "input",
        {
          type: "text",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ React9.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartTextarea.jsx
import React10 from "react";
function SmartTextarea({
  name,
  defaultValue = "",
  label,
  className,
  textareaClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React10.createElement(
    SmartField,
    {
      name,
      defaultValue,
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React10.createElement("div", { className }, label && /* @__PURE__ */ React10.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React10.createElement(
        "textarea",
        {
          value,
          onChange: (e) => setValue(e.target.value),
          className: textareaClassName,
          ...props
        }
      ), /* @__PURE__ */ React10.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartSelect.jsx
import React11 from "react";
function SmartSelect({
  name,
  defaultValue = "",
  label,
  options = [],
  className,
  selectClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ React11.createElement(
    SmartField,
    {
      name,
      defaultValue,
      render: ({ value, setValue, validation }) => /* @__PURE__ */ React11.createElement("div", { className }, label && /* @__PURE__ */ React11.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ React11.createElement(
        "select",
        {
          value,
          onChange: (e) => setValue(e.target.value),
          className: selectClassName,
          ...props
        },
        options.map((opt) => /* @__PURE__ */ React11.createElement("option", { key: opt.value, value: opt.value }, opt.label))
      ), /* @__PURE__ */ React11.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}
export {
  SmartCheckbox,
  SmartDate,
  SmartField,
  SmartInputContext,
  SmartInputProvider,
  SmartNumber,
  SmartPassword,
  SmartRadio,
  SmartSelect,
  SmartText,
  SmartTextarea,
  useSmartInput
};
//# sourceMappingURL=index.mjs.map