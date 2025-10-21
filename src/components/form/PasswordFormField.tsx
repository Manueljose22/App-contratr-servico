import React, { useState } from 'react';
import { Controller, FieldError } from 'react-hook-form';
import { FormFieldProps } from './types';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { Button } from '../ui/button';




export function PasswordFormField({placeholder,className,type = "text",control,name,rules,secureTextEntry,onFocus,onBlurCustom,maxLength,label,icon,error, ...rest}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  return (
    <div className={className}>
      {label && <Label htmlFor={name} className="mb-2 text-text-light">{label}</Label>}

      <div
        className={` bg-background px-2 rounded-lg flex flex-row items-center ${
          isFocused ? 'border-2 border-primary' : ' border-2'
        }`}
      >
        {icon && <div>{icon}</div>}

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
            id={name}
              className="border-none focus-visible:ring-0 focus-visible:ring-transparent focus:border-transparent shadow-none"
              placeholder={placeholder}
              onFocus={() => {
                setIsFocused(true);
                if (onFocus) onFocus();
              }}
              onBlur={() => {
                setIsFocused(false);
                onBlur();
                if (onBlurCustom) onBlurCustom();
              }}
              onChange={onChange}
              value={value ?? ""}
              type={!isShowPass ? type : 'text'}
              
              maxLength={maxLength}
            />
          )}
        />

        <Button variant={"ghost"} onClick={() => setIsShowPass(!isShowPass)}>
          {isShowPass ? (
            <EyeIcon size={18} className="text-slate-500"  />
          ) : (
            <EyeClosed  size={18} className="text-slate-500" />
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-400 mt-1">
          {error?.message}
        </p>
      )}
    </div>
  );
}
