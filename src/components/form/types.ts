import { FieldError } from "react-hook-form";

export interface FormFieldProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  type?: "text" | "email" | "password" | "number";
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlurCustom?: () => void;
  className?: string;
  maxLength?: number;
  value?: string;
  label?: string;
  icon?: React.ReactNode;
  error?: FieldError;
  onChangeText?: (text: string) => void;
}