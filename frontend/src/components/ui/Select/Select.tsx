import React from 'react';

import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';
import { getInputClasses } from '../FormFieldWrapper/formStyles';

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
        <FormFieldWrapper
            label={label}
            required={props.required}
            error={error}
            helperText={helperText}
            id={selectId}
            name={props.name}
        >
            <select
                id={selectId}
                className={getInputClasses(error, className)}
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
        </FormFieldWrapper>
    );
}