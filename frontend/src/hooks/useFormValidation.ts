/**
 * Form validation hook using shared validation rules
 * Provides consistent client-side validation that matches backend rules
 */

import { useState } from 'react';

import { ValidationHelpers } from '../../../shared/validationRules';

import type { IUserRegistrationRequest } from '../../../shared/user.interface';

export interface ValidationErrors extends Record<string, string | undefined> {
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    familyName?: string;
    bio?: string;
    age?: string;
    general?: string;
}

/**
 * Custom hook for form validation using shared validation rules
 */
export function useFormValidation() {
    const [errors, setErrors] = useState<ValidationErrors>({});

    /**
     * Validates a single field and updates the errors state
     */
    const validateField = (field: keyof ValidationErrors, value: string | number): boolean => {
        const newErrors = { ...errors };
        
        switch (field) {
            case 'username':
                const usernameResult = ValidationHelpers.validateUsername(value as string);
                if (!usernameResult.isValid) {
                    newErrors.username = usernameResult.error;
                } else {
                    delete newErrors.username;
                }
                break;
                
            case 'email':
                const emailResult = ValidationHelpers.validateEmail(value as string);
                if (!emailResult.isValid) {
                    newErrors.email = emailResult.error;
                } else {
                    delete newErrors.email;
                }
                break;
                
            case 'password':
                const passwordResult = ValidationHelpers.validatePassword(value as string);
                if (!passwordResult.isValid) {
                    newErrors.password = passwordResult.error;
                } else {
                    delete newErrors.password;
                }
                break;
                
            case 'firstName':
                if (!value || (value as string).trim() === '') {
                    newErrors.firstName = 'First name is required';
                } else {
                    delete newErrors.firstName;
                }
                break;
                
            case 'familyName':
                if (!value || (value as string).trim() === '') {
                    newErrors.familyName = 'Family name is required';
                } else {
                    delete newErrors.familyName;
                }
                break;
                
            case 'bio':
                const bioResult = ValidationHelpers.validateBio(value as string);
                if (!bioResult.isValid) {
                    newErrors.bio = bioResult.error;
                } else {
                    delete newErrors.bio;
                }
                break;
                
            case 'age':
                if (typeof value === 'number') {
                    const ageResult = ValidationHelpers.validateAge(value);
                    if (!ageResult.isValid) {
                        newErrors.age = ageResult.error;
                    } else {
                        delete newErrors.age;
                    }
                }
                break;
        }
        
        setErrors(newErrors);
        return !newErrors[field];
    };

    /**
     * Validates all form fields at once
     */
    const validateForm = (formData: IUserRegistrationRequest): boolean => {
        const newErrors: ValidationErrors = {};
        
        // Validate all required fields
        const usernameResult = ValidationHelpers.validateUsername(formData.username);
        if (!usernameResult.isValid) newErrors.username = usernameResult.error;
        
        const emailResult = ValidationHelpers.validateEmail(formData.email);
        if (!emailResult.isValid) newErrors.email = emailResult.error;
        
        const passwordResult = ValidationHelpers.validatePassword(formData.password);
        if (!passwordResult.isValid) newErrors.password = passwordResult.error;
        
        if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData.familyName?.trim()) newErrors.familyName = 'Family name is required';
        
        if (formData.bio) {
            const bioResult = ValidationHelpers.validateBio(formData.bio);
            if (!bioResult.isValid) newErrors.bio = bioResult.error;
        }
        
        if (formData.profileOptions.age) {
            const ageResult = ValidationHelpers.validateAge(formData.profileOptions.age);
            if (!ageResult.isValid) newErrors.age = ageResult.error;
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Clears all validation errors
     */
    const clearErrors = () => {
        setErrors({});
    };

    /**
     * Clears error for a specific field
     */
    const clearFieldError = (field: keyof ValidationErrors) => {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
    };

    return {
        errors,
        validateField,
        validateForm,
        clearErrors,
        clearFieldError,
        hasErrors: Object.keys(errors).length > 0
    };
}
