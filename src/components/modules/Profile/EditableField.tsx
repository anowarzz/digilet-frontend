import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2, Eye, EyeOff, X } from "lucide-react";
import { type ComponentType } from "react";
import { type UseFormReturn } from "react-hook-form";

export interface EditableFieldProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  field: string;
  value: string;
  isPassword?: boolean;
  isTextarea?: boolean;
  isEditing: boolean;
  showPassword?: boolean;
  form: UseFormReturn;
  onEdit: (field: string) => void;
  onSave: (field: string, data: Record<string, unknown>) => void;
  onCancel: (field: string) => void;
  onTogglePassword?: () => void;
}

export const EditableField = ({
  icon: Icon,
  label,
  field,
  value,
  isPassword = false,
  isTextarea = false,
  isEditing,
  showPassword = false,
  form,
  onEdit,
  onSave,
  onCancel,
  onTogglePassword,
}: EditableFieldProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-shadow">
            <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium uppercase tracking-wider">
              {label}
            </p>
            {isEditing ? (
              <Form {...form}>
                <div className="flex gap-2 items-start">
                  <FormField
                    control={form.control}
                    name={field}
                    render={({ field: formField }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative">
                            {isTextarea ? (
                              <Textarea
                                {...formField}
                                className="min-h-[60px] text-sm resize-none"
                                placeholder="Enter address"
                              />
                            ) : (
                              <Input
                                {...formField}
                                type={
                                  isPassword
                                    ? showPassword
                                      ? "text"
                                      : "password"
                                    : "text"
                                }
                                className="h-8 text-sm pr-10"
                                placeholder={
                                  isPassword ? "Enter new password" : ""
                                }
                              />
                            )}
                            {isPassword && onTogglePassword && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-8 w-8 p-0"
                                onClick={onTogglePassword}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-3 h-3" />
                                ) : (
                                  <Eye className="w-3 h-3" />
                                )}
                              </Button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 w-8 p-0 bg-green-500 hover:bg-green-600 text-white"
                    onClick={form.handleSubmit((data) => onSave(field, data))}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => onCancel(field)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Form>
            ) : (
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {value}
              </p>
            )}
          </div>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-white dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onEdit(field)}
          >
            <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600" />
          </Button>
        )}
      </div>
    </div>
  );
};
