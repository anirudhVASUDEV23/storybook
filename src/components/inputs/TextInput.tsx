import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../typography';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  "w-full rounded-md border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-neutral-300 focus:border-primary-500 focus:ring-primary-500",
        error: "border-error-500 text-error-700 focus:border-error-500 focus:ring-error-500",
      },
      size: {
        sm: "h-8 px-2 text-sm",
        md: "h-10 px-3 text-base",
        lg: "h-12 px-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface TextInputProps 
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ 
    className, 
    type = "text", 
    label, 
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    variant = errorText ? "error" : "default",
    size,
    fullWidth = true,
    disabled,
    required,
    ...props 
  }, ref) => {
    const id = React.useId();

    return (
      <div className={cn("flex flex-col", fullWidth ? "w-full" : "w-auto")}>
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              "mb-1.5 text-sm font-medium",
              disabled ? "text-neutral-400" : "text-neutral-700 dark:text-neutral-300"
            )}
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            id={id}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={variant === "error"}
            aria-describedby={helperText || errorText ? `${id}-description` : undefined}
            className={cn(
              inputVariants({ variant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(helperText || errorText) && (
          <div id={`${id}-description`} className="mt-1">
            {variant === "error" && errorText ? (
              <Text variant="helper" className="text-error-500">{errorText}</Text>
            ) : helperText ? (
              <Text variant="helper">{helperText}</Text>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";