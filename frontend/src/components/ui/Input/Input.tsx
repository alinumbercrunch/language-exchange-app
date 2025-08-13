import React from 'react';

/**
 * Props for the Input component.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Label text to display above the input */
    label?: string;
    /** Error message to display below the input */
    error?: string;
    /** Helper text to display below the input when no error */
    helperText?: string;
}

/**
 * A reusable input field component with label, error, and helper text support.
 * 
 * @param label - Optional label text displayed above input
 * @param error - Error message displayed below input in red
 * @param helperText - Helper text displayed below input when no error
 * @param className - Additional CSS classes
 * @param id - HTML id attribute, falls back to name if not provided
 * @param props - Additional HTML input attributes
 * @returns A styled input field with optional label and messages
 */
export function Input({ 
    label, 
    error, 
    helperText, 
    className = '', 
    id,
    ...props 
}: InputProps) {
    const inputId = id || props.name;
    
    return (
        <div className="space-y-1">
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={inputId}
                className={`
                    block w-full rounded-md border px-3 py-2 text-sm transition-colors
                    bg-white text-gray-900 placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-offset-1
                    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                    ${error 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
}
