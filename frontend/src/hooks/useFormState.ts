import { useState, useCallback } from 'react';

import { setNestedValue } from '../utils/formHelpers';

import type { IUserRegistrationRequest } from '../../../shared/user.interface';

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
