'use client';

import React from 'react';

import styles from './register.module.css';
import { FormField, SelectField, TextAreaField } from '../../components/FormFields';
import { DEFAULT_REGISTRATION_DATA, PROFICIENCY_OPTIONS, GENDER_OPTIONS } from '../../constants/formConstants';
import { useAsync } from '../../hooks/useAsync';
import { useFormState } from '../../hooks/useFormState';
import { registerUser } from '../../services/userService';

const RegistrationForm: React.FC = () => {
    const { formData, handleChange } = useFormState(DEFAULT_REGISTRATION_DATA);

    // Use useAsync for form submission instead of manual state management
    const { 
        data: registrationResult, 
        error: submitError, 
        isLoading: isSubmitting, 
        execute: submitRegistration 
    } = useAsync(() => registerUser(formData), false); // false = don't run immediately

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitRegistration();
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>New User Registration</h2>
            
            {submitError && (
                <div className={styles.errorMessage}>
                    <p>{submitError.message}</p>
                </div>
            )}
            
            {registrationResult && (
                <div className={styles.successMessage}>
                    <p>Registration successful! Welcome to Language Exchange!</p>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <FormField
                    id="username"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                
                <FormField
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <FormField
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                
                <FormField
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                
                <FormField
                    id="familyName"
                    label="Family Name"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleChange}
                    required
                />
                
                <TextAreaField
                    id="bio"
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className={styles.fullWidth}
                    required
                />
                
                <h3>Profile Options</h3>
                
                <FormField
                    id="nativeLanguage"
                    label="Native Language"
                    name="profileOptions.nativeLanguage"
                    value={formData.profileOptions.nativeLanguage}
                    onChange={handleChange}
                    required
                />
                
                <FormField
                    id="practicingLanguage"
                    label="Practicing Language"
                    name="profileOptions.practicingLanguage.language"
                    value={formData.profileOptions.practicingLanguage.language}
                    onChange={handleChange}
                    required
                />
                
                <SelectField
                    id="proficiency"
                    label="Proficiency"
                    name="profileOptions.practicingLanguage.proficiency"
                    value={formData.profileOptions.practicingLanguage.proficiency}
                    onChange={handleChange}
                    options={PROFICIENCY_OPTIONS}
                    required
                />
                
                <FormField
                    id="country"
                    label="Country"
                    name="profileOptions.country"
                    value={formData.profileOptions.country}
                    onChange={handleChange}
                    required
                />
                
                <FormField
                    id="city"
                    label="City"
                    name="profileOptions.city"
                    value={formData.profileOptions.city}
                    onChange={handleChange}
                    required
                />
                
                <SelectField
                    id="gender"
                    label="Gender"
                    name="profileOptions.gender"
                    value={formData.profileOptions.gender}
                    onChange={handleChange}
                    options={GENDER_OPTIONS}
                    required
                />
                
                <FormField
                    id="age"
                    label="Age"
                    name="profileOptions.age"
                    type="number"
                    value={formData.profileOptions.age}
                    onChange={handleChange}
                    required
                />
                
                <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;