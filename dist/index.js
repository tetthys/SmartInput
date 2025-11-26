var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.jsx
var index_exports = {};
__export(index_exports, {
  SmartCheckbox: () => SmartCheckbox,
  SmartDate: () => SmartDate,
  SmartField: () => SmartField,
  SmartInputContext: () => SmartInputContext,
  SmartInputProvider: () => SmartInputProvider,
  SmartNumber: () => SmartNumber,
  SmartPassword: () => SmartPassword,
  SmartRadio: () => SmartRadio,
  SmartSelect: () => SmartSelect,
  SmartText: () => SmartText,
  SmartTextarea: () => SmartTextarea,
  useSmartInput: () => useSmartInput
});
module.exports = __toCommonJS(index_exports);

// src/SmartInputContext.jsx
var import_react = __toESM(require("react"));
var import_socket = require("socket.io-client");
var SmartInputContext = (0, import_react.createContext)({
  socket: null,
  sessionId: null
});
function SmartInputProvider({
  sessionId,
  socketUrl = "http://localhost:3000",
  children
}) {
  const socket = (0, import_react.useMemo)(() => {
    return (0, import_socket.io)(socketUrl, { autoConnect: false });
  }, [socketUrl]);
  (0, import_react.useEffect)(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return /* @__PURE__ */ import_react.default.createElement(SmartInputContext.Provider, { value: { socket, sessionId } }, children);
}

// src/useSmartInput.js
var import_react2 = require("react");
function useSmartInput(name) {
  const { socket, sessionId } = (0, import_react2.useContext)(SmartInputContext);
  const [validation, setValidation] = (0, import_react2.useState)(null);
  (0, import_react2.useEffect)(() => {
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
  const sendInput = (0, import_react2.useCallback)(
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
var import_react3 = __toESM(require("react"));
function SmartField({
  name,
  defaultValue,
  render,
  type,
  options,
  className,
  onChange,
  // 부모가 넘기는 onChange
  ...props
}) {
  const [value, setValue] = (0, import_react3.useState)(
    type === "checkbox" ? Boolean(defaultValue) : defaultValue ?? ""
  );
  const { sendInput, validation } = useSmartInput(name);
  const setValueAndNotify = (0, import_react3.useCallback)(
    (nextValue) => {
      setValue(nextValue);
      if (typeof onChange === "function") {
        onChange(nextValue);
      }
    },
    [onChange]
  );
  (0, import_react3.useEffect)(() => {
    sendInput(value);
  }, [value, sendInput]);
  return render({
    name,
    value,
    setValue: setValueAndNotify,
    validation,
    options,
    className,
    ...props
  });
}

// src/components/SmartCheckbox.jsx
var import_react5 = __toESM(require("react"));

// src/components/FieldError.jsx
var import_react4 = __toESM(require("react"));
function FieldError({ validation, className }) {
  if (!validation || !validation.is_error || !validation.error_message) {
    return null;
  }
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: className || "text-red-500 text-sm mt-1" }, validation.error_message);
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
  return /* @__PURE__ */ import_react5.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "checkbox",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react5.default.createElement("div", { className }, /* @__PURE__ */ import_react5.default.createElement("label", { className: "inline-flex items-center" }, /* @__PURE__ */ import_react5.default.createElement(
        "input",
        {
          type: "checkbox",
          checked: Boolean(value),
          onChange: (e) => setValue(e.target.checked),
          className: inputClassName,
          ...props
        }
      ), label && /* @__PURE__ */ import_react5.default.createElement("span", { className: "ml-2" }, label)), /* @__PURE__ */ import_react5.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartDate.jsx
var import_react6 = __toESM(require("react"));
function SmartDate({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ import_react6.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "date",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react6.default.createElement("div", { className }, label && /* @__PURE__ */ import_react6.default.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react6.default.createElement(
        "input",
        {
          type: "date",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ import_react6.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartNumber.jsx
var import_react7 = __toESM(require("react"));
function SmartNumber({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ import_react7.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "number",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react7.default.createElement("div", { className }, label && /* @__PURE__ */ import_react7.default.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react7.default.createElement(
        "input",
        {
          type: "number",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ import_react7.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartPassword.jsx
var import_react8 = __toESM(require("react"));
function SmartPassword({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ import_react8.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "password",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react8.default.createElement("div", { className }, label && /* @__PURE__ */ import_react8.default.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react8.default.createElement(
        "input",
        {
          type: "password",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ import_react8.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartRadio.jsx
var import_react9 = __toESM(require("react"));
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
  return /* @__PURE__ */ import_react9.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "radio",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react9.default.createElement("div", { className }, label && /* @__PURE__ */ import_react9.default.createElement("div", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react9.default.createElement("div", null, options.map((opt) => /* @__PURE__ */ import_react9.default.createElement(
        "label",
        {
          key: opt.value,
          className: itemClassName || "inline-flex items-center mr-4"
        },
        /* @__PURE__ */ import_react9.default.createElement(
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
        /* @__PURE__ */ import_react9.default.createElement("span", { className: "ml-1" }, opt.label)
      ))), /* @__PURE__ */ import_react9.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartText.jsx
var import_react10 = __toESM(require("react"));
function SmartText({
  name,
  defaultValue = "",
  label,
  className,
  inputClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ import_react10.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      type: "text",
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react10.default.createElement("div", { className }, label && /* @__PURE__ */ import_react10.default.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react10.default.createElement(
        "input",
        {
          type: "text",
          value,
          onChange: (e) => setValue(e.target.value),
          className: inputClassName,
          ...props
        }
      ), /* @__PURE__ */ import_react10.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartTextarea.jsx
var import_react11 = __toESM(require("react"));
function SmartTextarea({
  name,
  defaultValue = "",
  label,
  className,
  textareaClassName,
  errorClassName,
  ...props
}) {
  return /* @__PURE__ */ import_react11.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react11.default.createElement("div", { className }, label && /* @__PURE__ */ import_react11.default.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react11.default.createElement(
        "textarea",
        {
          value,
          onChange: (e) => setValue(e.target.value),
          className: textareaClassName,
          ...props
        }
      ), /* @__PURE__ */ import_react11.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}

// src/components/SmartSelect.jsx
var import_react12 = __toESM(require("react"));
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
  return /* @__PURE__ */ import_react12.default.createElement(
    SmartField,
    {
      name,
      defaultValue,
      render: ({ value, setValue, validation }) => /* @__PURE__ */ import_react12.default.createElement("div", { className }, label && /* @__PURE__ */ import_react12.default.createElement("label", { className: "block mb-1 text-sm font-medium" }, label), /* @__PURE__ */ import_react12.default.createElement(
        "select",
        {
          value,
          onChange: (e) => setValue(e.target.value),
          className: selectClassName,
          ...props
        },
        options.map((opt) => /* @__PURE__ */ import_react12.default.createElement("option", { key: opt.value, value: opt.value }, opt.label))
      ), /* @__PURE__ */ import_react12.default.createElement(FieldError, { validation, className: errorClassName }))
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map