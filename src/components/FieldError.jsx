// src/components/FieldError.jsx

import React from "react";

export function FieldError({ validation, className }) {
  if (!validation || !validation.is_error || !validation.error_message) {
    return null;
  }

  return (
    <div className={className || "text-red-500 text-sm mt-1"}>
      {validation.error_message}
    </div>
  );
}
