import React from 'react';

/**
 * Props for the Select component.
 */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Label text to display above the select */
    label?: string;
    /** Error message to display below the select */
    error?: string;
    /** Helper text to display below the select when no error */
    helperText?: string;
    /** Array of options to display in the select dropdown */
    options: readonly { readonly value: string; readonly label: string }[];
    /** Placeholder text for the select */
    placeholder?: string;
}

/**
 * A reusable select dropdown component with label, error, and helper text support.
 * 
 * @param label - Optional label text displayed above select
 * @param error - Error message displayed below select in red
 * @param helperText - Helper text displayed below select when no error
 * @param options - Array of option objects with value and label properties
 * @param placeholder - Placeholder text for first option
 * @param className - Additional CSS classes
 * @param id - HTML id attribute, falls back to name if not provided
 * @param props - Additional HTML select attributes
 * @returns A styled select dropdown with optional label and messages
 */
export function Select({ 
    label, 
    error, 
    helperText, 
    options,
    placeholder,
    className = '', 
    id,
    ...props 
}: SelectProps) {
    const selectId = id || props.name;
    
    return (
        <div className="space-y-1">
            {label && (
                <label 
                    htmlFor={selectId} 
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                id={selectId}
                className={`
                    block w-full rounded-md border px-3 py-2 text-sm transition-colors
                    bg-white text-gray-900 
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    ${error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }
                    ${className}
                `}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
}
