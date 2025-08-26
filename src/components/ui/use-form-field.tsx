/* eslint-disable react-refresh/only-export-components */
import { FormFieldContext } from "@/context/form-field-context";
import React from "react";
import { useFormContext, useFormState } from "react-hook-form";

// Import the FormItemContextValue type from form.tsx
import type { FormItemContextValue } from "./form";

// Create FormItemContext here since it's used in this hook
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// Export the context so it can be used in form.tsx
export { FormItemContext };
