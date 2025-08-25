import type { FormFieldContextValue } from "@/components/ui/form";
import { createContext } from "react";

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);
