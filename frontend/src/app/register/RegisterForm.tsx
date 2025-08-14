'use client';

import React, { useState } from 'react';

import { RegistrationFormFields } from './RegistrationFormFields';
import { Container } from '../../components/layout/Container';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { DEFAULT_REGISTRATION_DATA } from '../../constants/formConstants';
import { useFormState } from '../../hooks/useFormState';
import { registerUser } from '../../services/userService';

/**
 * Registration form component for user signup.
 * Handles user input, validation, and submission to the backend API.
 * 
 * @returns A complete registration form with validation and error handling
 */
export const RegisterForm: React.FC = () => {
    const { formData, handleChange, resetForm } = useFormState(DEFAULT_REGISTRATION_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});
        setSuccessMessage('');
        
        try {
            const result = await registerUser(formData);
            const userName = result.user?.firstName || result.user?.username || 'User';
            setSuccessMessage(`Registration successful! Welcome, ${userName}!`);
            resetForm();
        } catch (error) {
            if (error instanceof Error) {
                // Handle validation errors or other specific errors
                setErrors({ general: error.message });
            } else {
                setErrors({ general: 'An unexpected error occurred. Please try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container size="md" className="py-8">
            <PageHeader 
                title="Create Your Account"
                subtitle="Join our language exchange community and start practicing with native speakers"
            />
            
            {/* Success Message */}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800">{successMessage}</p>
                </div>
            )}
            
            {/* General Error Message */}
            {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{errors.general}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
                <RegistrationFormFields
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                />
                
                <div className="mt-8 flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={isLoading}
                    >
                        Reset Form
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </div>
            </form>
        </Container>
    );
};
