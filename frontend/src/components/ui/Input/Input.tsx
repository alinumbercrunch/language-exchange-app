import React from 'react';

import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';
import { getInputClasses } from '../FormFieldWrapper/formStyles';

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
        <FormFieldWrapper
            label={label}
            required={props.required}
            error={error}
            helperText={helperText}
            id={inputId}
            name={props.name}
        >
            <input
                id={inputId}
                className={getInputClasses(error, className)}
                {...props}
            />
        </FormFieldWrapper>
    );
}