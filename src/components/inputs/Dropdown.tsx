import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../typography';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, Check, X } from 'lucide-react';

const dropdownTriggerVariants = cva(
  "flex items-center justify-between w-full rounded-md border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
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

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps 
  extends VariantProps<typeof dropdownTriggerVariants> {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  clearable?: boolean;
  className?: string;
  onBlur?: () => void;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    label,
    helperText,
    errorText,
    variant = errorText ? "error" : "default",
    size = "md",
    required,
    disabled,
    fullWidth = true,
    clearable = false,
    className,
    onBlur,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const id = React.useId();

    // Find the selected option
    const selectedOption = options.find(option => option.value === value);

    // Filter options based on search term
    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle dropdown toggle
    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm('');
      }
    };

    // Handle option select
    const handleSelect = (option: DropdownOption) => {
      if (!option.disabled && onChange) {
        onChange(option.value);
      }
      setIsOpen(false);
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onChange) {
        onChange('');
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          if (onBlur) {
            onBlur();
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onBlur]);

    // Handle keyboard navigation
    useEffect(() => {
      if (!isOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            setIsOpen(false);
            break;
          default:
            break;
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
      <div 
        ref={dropdownRef}
        className={cn("relative", fullWidth ? "w-full" : "w-auto", className)}
        {...props}
      >
        {label && (
          <label 
            htmlFor={id} 
            className={cn(
              "block mb-1.5 text-sm font-medium",
              disabled ? "text-neutral-400" : "text-neutral-700 dark:text-neutral-300"
            )}
          >
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}

        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? id : undefined}
          aria-invalid={variant === "error"}
          aria-describedby={helperText || errorText ? `${id}-description` : undefined}
          className={cn(
            dropdownTriggerVariants({ variant, size }),
          )}
          onClick={toggleDropdown}
          disabled={disabled}
        >
          <span className={cn(
            "truncate",
            !selectedOption && "text-neutral-500"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="flex items-center">
            {clearable && selectedOption && (
              <button
                type="button"
                className="p-1 text-neutral-400 hover:text-neutral-500 focus:outline-none"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown 
              size={size === "sm" ? 16 : size === "lg" ? 20 : 18} 
              className={cn(
                "ml-1 transition-transform",
                isOpen && "rotate-180"
              )} 
            />
          </div>
        </button>

        {isOpen && (
          <div 
            className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-neutral-200 max-h-60 overflow-auto"
            role="listbox"
          >
            {options.length > 10 && (
              <div className="sticky top-0 p-2 bg-white border-b border-neutral-200">
                <input
                  type="text"
                  className="w-full p-1.5 text-sm border border-neutral-300 rounded-md"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoComplete="off"
                />
              </div>
            )}
            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    tabIndex={option.disabled ? -1 : 0}
                    className={cn(
                      "px-3 py-2 cursor-pointer flex items-center justify-between",
                      option.value === value ? "bg-primary-50 text-primary-700" : "text-neutral-900",
                      option.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-100",
                    )}
                    onClick={() => !option.disabled && handleSelect(option)}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !option.disabled) {
                        e.preventDefault();
                        handleSelect(option);
                      }
                    }}
                  >
                    <span>{option.label}</span>
                    {option.value === value && <Check size={16} className="text-primary-500" />}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-neutral-500">No options found</div>
              )}
            </div>
          </div>
        )}

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

Dropdown.displayName = "Dropdown";