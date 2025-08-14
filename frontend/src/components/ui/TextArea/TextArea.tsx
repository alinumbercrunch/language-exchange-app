import React from 'react';

/**
 * Props for the TextArea component.
 */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Label text to display above the textarea */
    label?: string;
    /** Error message to display below the textarea */
    error?: string;
    /** Helper text to display below the textarea when no error */
    helperText?: string;
}

/**
 * A reusable textarea component with label, error, and helper text support.
 * 
 * @param label - Optional label text displayed above textarea
 * @param error - Error message displayed below textarea in red
 * @param helperText - Helper text displayed below textarea when no error
 * @param className - Additional CSS classes
 * @param id - HTML id attribute, falls back to name if not provided
 * @param props - Additional HTML textarea attributes
 * @returns A styled textarea field with optional label and messages
 */
export function TextArea({ 
    label, 
    error, 
    helperText, 
    className = '', 
    id,
    ...props 
}: TextAreaProps) {
    const textAreaId = id || props.name;
    
    return (
        <div className="space-y-1">
            {label && (
                <label 
                    htmlFor={textAreaId} 
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={textAreaId}
                rows={4}
                className={`
                    block w-full rounded-md border px-3 py-2 text-sm transition-colors
                    bg-white text-gray-900 placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-offset-1 resize-vertical
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
