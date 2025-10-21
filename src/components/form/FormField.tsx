import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormFieldProps } from './types';
import { Label } from '../ui/label';




export function FormField({placeholder,className,type = "text",control,name,rules,secureTextEntry,onFocus,onBlurCustom,maxLength,label,icon,error, ...rest}: FormFieldProps) {
 
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={className}>
      {label && <Label htmlFor={name} className="mb-2 text-text-light">{label}</Label>}

      <div
        className={`bg-background px-2 rounded-lg flex flex-row items-center ${
          isFocus ? 'border-2 border-primary' : ' border-2'
        }`}>
        {icon}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              {...rest}
              id={name}
              className="border-none focus-visible:ring-0 focus-visible:ring-transparent focus:border-transparent shadow-none"
              placeholder={placeholder}
              onFocus={() => {
                setIsFocus(true);
                if (onFocus) onFocus();
              }}
              onBlur={() => {
                setIsFocus(false);
                onBlur();
                if (onBlurCustom) onBlurCustom();
              }}
              onChange={onChange}
              value={value ?? ""}
              type={type}
              required
              maxLength={maxLength}
            />
          )}
        />
      </div>

      {error && (
        <small className="text-small text-red-400">
          {error?.message}
        </small>
      )}
    </div>
  );
}
