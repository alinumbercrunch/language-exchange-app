import { useState, useCallback } from 'react';

import { setNestedValue } from '../utils/formHelpers';

import type { IUserRegistrationRequest } from '../../../shared/user.interface';

/**
 * A custom hook for managing form state with nested object support.
 * Provides handlers for form field changes, form reset, and direct state updates.
 * 
 * @param initialData - Initial form data object
 * @returns Object containing current form data, change handler, reset function, and setter
 */
export function useFormState(initialData: IUserRegistrationRequest) {
    const [formData, setFormData] = useState<IUserRegistrationRequest>(initialData);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => {
            // Safely parse age to number if applicable, otherwise keep it as a string
            const processedValue = name === 'profileOptions.age' ? parseInt(value, 10) || 0 : value;
            return setNestedValue(prev, name, processedValue);
        });
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialData);
    }, [initialData]);

    return {
        formData,
        handleChange,
        resetForm,
        setFormData,
    };
}

/**
 * A generic form state hook for simple forms (like login)
 * @param initialData - Initial form data object
 * @returns Object containing current form data, change handler, reset function, and setter
 */
export function useSimpleFormState<T extends Record<string, string | number>>(initialData: T) {
    const [formData, setFormData] = useState<T>(initialData);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialData);
    }, [initialData]);

    return {
        formData,
        handleChange,
        resetForm,
        setFormData,
    };
}
